import styled from "styled-components";

import Button from "./Button";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Popup from "./Popup";
import { updateProject, getTeamProjects } from "../Services/apiCalls";
import { userState, projectsState } from "../globalstate";
import { parseTeamProjectsDto } from "../Services/helpers";

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
`;

const StyledSpan = styled.span`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  color: ${({ c }) => c};
  font-size: ${({ fs }) => fs};
  margin: ${({ mg }) => mg};
  line-height: 150%;
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

const StyledLabel = styled.label`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
`;

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

const ProjectItem = ({ project, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useRecoilState(userState);
  const [projects, setProjects] = useRecoilState(projectsState);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProject = async () => {
    console.log("Editing project");
    let newProjectName =
      document.getElementById("updateProjectName").value.length === 0
        ? project.name
        : document.getElementById("updateProjectName").value;
    let newProjectDescription =
      document.getElementById("updateDescription").value.length === 0
        ? project.projectDecription
        : document.getElementById("updateDescription").value;
    console.log("Dropdown value" + document.getElementById("status").value);
    let newProjectStatus =
      document.getElementById("status").value.length === 0
        ? project.isActive
        : document.getElementById("status").value === "yes"
        ? true
        : false;
    // newProjectStatus = newProjectStatus === "yes" ? true : false;

    console.log(newProjectName);
    console.log(newProjectDescription);
    console.log(project.id);
    console.log(newProjectStatus);

    const getProjects = async () => {
      await getTeamProjects(user.selectedCompany, user.selectedTeam.id)
        // await getTeamProjects(user.selectedCompany, 17) //work around until selected team is working
        .then((serverResponse) => {
          console.log("The server is returning these values:");
          console.log(serverResponse.data);
          console.log(parseTeamProjectsDto(serverResponse.data));
          setProjects(parseTeamProjectsDto(serverResponse.data));
        })
        .catch((error) => console.log(error));
    };

    // await(updateProject(project.id, newProjectName, newProjectDescription, newProjectStatus, user.selectedTeam))//work around until selected team is working
    await updateProject(
      project.id,
      newProjectName,
      newProjectDescription,
      newProjectStatus,
      17
    ) //work around until selected team is working
      .then(() => getProjects())
      .catch((error) => console.log(error));
    togglePopup();
  };

  return (
    <div key={idx}>
      <StyledHr w="80%" bd="1px solid #DEB992" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <StyledSpan fs="24px" mg="2% 0% 2% 10%" c="#FFFFFF">
          {project.projectName}
        </StyledSpan>
        {project.isActive ? (
          <StyledSpan fs="14px" mg="2% 0% 2% 10%" c="#22DD2A">
            Active
          </StyledSpan>
        ) : (
          <StyledSpan fs="14px" mg="2% 0% 2% 10%" c="#DF0F0F">
            Inactive
          </StyledSpan>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: "10%",
          paddingBottom: "10%",
        }}
      >
        <p
          style={{
            margin: "2% 0% 2% 12%",
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          {project.projectDescription}
        </p>
        <Button
          w="103px"
          h="32px"
          bg="#DEB992"
          c="rgba(0, 0, 0, 0.75)"
          style={{ ":hover": { backgroundColor: "#eedcc9" } }}
          onClick={togglePopup}
        >
          Edit
        </Button>
      </div>
      {isOpen && (
        <Popup
          content={
            <div style={{ textAlign: "center" }}>
              <h3 style={{ textAlign: "left", marginLeft: "8%" }}>
                Project Name
              </h3>
              <Input id="updateProjectName" type="text" required />
              <h3 style={{ textAlign: "left", marginLeft: "8%" }}>
                Description
              </h3>
              <Input id="updateDescription" type="text" required />
              <div>
                <label for="status">Active?</label>
                <br />
                <br />
                <StyledSelect name="status" id="status" required>
                  <option value="" disabled selected hidden>
                    Pick an option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </StyledSelect>
              </div>
              <Button
                onClick={handleEditProject}
                w="199px"
                h="45px"
                bg="#1BA098"
                c="#FFFFFF"
                mg="5%"
              >
                Save
              </Button>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default ProjectItem;
