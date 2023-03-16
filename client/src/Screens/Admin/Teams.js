import { Navigate, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../Components/NavBar";
import { userState, teamsState, userRegistryState, allProjectsState } from "../../globalstate";
import "../../Teams.css";
import TeamBox from "../../Components/TeamBox";
import Popup from "../../Components/Popup";
import Button from "../../Components/Button";
import { createTeam, getCompanyTeams, getCompanyUsers, getAllCompanyProjects } from "../../Services/apiCalls";
import { parseCompanyTeamsDto, parseCompanyUsersDto, parseTeamProjectsDto } from "../../Services/helpers";

const StyledSelect = styled.select`
  width: 163px;
  height: 36px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  gap: 8px;
  text-align: center;
  color: #5533ff;
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 2px solid #333;
  color: #ebebd3;
  background: transparent;
  text-align: center;
  font-size: 1.5em;
  margin: 10px;
  &::placeholder {
    color: #ebebd3;
  }
  &:focus {
    outline: none;
  }
`;

const Teams = () => {
  const [user, setUser] = useRecoilState(userState);
  const [teams, setTeams] = useRecoilState(teamsState);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [teamsSelected, setTeamsSelected] = useState([]);
  const [userRegistry, setUserRegistry] = useRecoilState(userRegistryState)
  const [allProjects, setAllProjects] = useRecoilState(allProjectsState)

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    getUsers()
    getAllProjects();
  }, [])

    const getAllProjects = async () => {
        await getAllCompanyProjects()
        .then((serverResponse) => {
            setAllProjects(parseTeamProjectsDto(serverResponse.data))
        })
        .catch((error) => console.log(error));
    }

  const getUsers = async () => {
    await getCompanyUsers(user.selectedCompany)
      .then((serverResponse) => {
        setUserRegistry(parseCompanyUsersDto(serverResponse.data))
      })
      .catch((error) => console.log(error))
  }
  // const [newTeam, setNewTeam] = useState({
  //   name: "",
  //   projects: [""],
  //   members: [""],
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setTeamsSelected((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleAddTeam = () => {
  //   setTeams((prevState) => [...prevState, newTeam]);
  //   setNewTeam({
  //     name: "",
  //     projects: [],
  //     members: [],
  //   });
  //   togglePopup();
  // };

  // const handleCancel = () => {
  //   setNewTeam({
  //     name: "",
  //     projects: [],
  //     members: [],
  //   });
  //   togglePopup();
  // };

  //get teams from backend on initial load
  useEffect(() => {
    getTeams();
  }, []);

  const handleClick = (teamClicked) => {
    let teamClickedId = teamClicked.currentTarget.id
    let teamObject;
    for (let team of teams) {
      if (team.id == teamClickedId) {
        teamObject = { ...team }
      }
    }
    setUser({ ...user, selectedTeam: teamObject });
  };

  //make request to backend to get teams
  const getTeams = async () => {
    await getCompanyTeams(user.selectedCompany)
      .then((serverResponse) => {
        setTeams(parseCompanyTeamsDto(serverResponse.data, allProjects));
      })
      .catch((error) => console.log(error));
  };

  const handleCreateTeam = async () => {
    console.log(user)
    let newTeamName = document.getElementById("newTeamName").value;
    let newDescription = document.getElementById("newDescription").value;

    createTeam(newTeamName, newDescription, user.selectedCompany, teamsSelected)
      .then(() => getTeams())
      .catch((error) => console.log(error))
    togglePopup();
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div style={{ backgroundColor: "#051622", minHeight: "100vh" }}>
        <NavBar />
        <div className="header">
          <h1 className="header-title">Teams</h1>
        </div>
        <div className="team-container">
          {teams.map((team, index) => (
            <NavLink key={index} id={team.id} onClick={handleClick} to="/projects" style={{ textDecoration: 'none' }}>
              <TeamBox
                name={team.teamName}
                projects={team.qtyProjects}
                members={team.members}
              />
            </NavLink>
          ))}

          {user.isAdmin ? (
            <button
              className="team-member"
              style={{
                fontSize: "32px",
                backgroundColor: "transparent",
                borderColor: "#DEB992",
                width: "325px",
                height: "325px",
              }}
              onClick={togglePopup}
            >
              +
            </button>
          ) : (
            ""
          )}

          <div className="team-card" style={{ width: "100px" }}>
            {isPopupOpen && (
              <Popup
                content={
                  <div style={{ textAlign: "center" }}>
                    <h3 style={{ textAlign: "left", marginLeft: "8%" }}>
                      Team Name
                    </h3>
                    <Input id="newTeamName" type="text" required />
                    <h3 style={{ textAlign: "left", marginLeft: "8%" }}>
                      Description
                    </h3>
                    <Input id="newDescription" type="text" required />
                    <div>
                      <h2>Select Members</h2>
                      <br />
                      <br />

                      <div className="form-group">
                        <label htmlFor="teamMembers">Members:</label>
                        <StyledSelect
                        style={{ width: "50%", height: "100%" }}
                          id="teamMembers"
                          name="members"
                          required
                          multiple
                          // value={newTeam.members}
                          onChange={(event) =>
                            setTeamsSelected({
                              ...teamsSelected,
                              members: Array.from(event.target.selectedOptions, option => option.value),
                            })
                          }
                        >
                          {Array.from(userRegistry).map(user => (
                            <option key={user.id} value={user.id}>
                              {user.firstName + " " + user.lastName[0] + "."}
                            </option>
                          ))}
                        </StyledSelect>
                      </div>
                      {/* <StyledSelect name="member" id="member" required>
                        <option value="" disabled selected hidden>
                          Pick an option
                        </option>
                        {teams.map((team) =>
                          team.members.map((member, idx) => (
                            <option id={idx} value={member}>
                              {member}
                            </option>
                          ))
                        )}
                      </StyledSelect> */}
                    </div>
                    <Button
                      onClick={handleCreateTeam}
                      w="199px"
                      h="45px"
                      bg="#1BA098"
                      c="#FFFFFF"
                      mg="5%"
                    >
                      Submit
                    </Button>
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Teams;
