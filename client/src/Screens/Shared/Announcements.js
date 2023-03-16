import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import NavBar from "../../Components/NavBar";
import { userState, announcementsState, allProjectsState } from "../../globalstate";
import Button from "../../Components/Button";
import Announcement from "../../Components/Announcement";
import Popup from "../../Components/Popup";
import { createAnnouncementObject } from "../../Services/objects";
import {
  getCompanyAnnouncements,
  createAnnouncement,
  getAllCompanyProjects
} from "../../Services/apiCalls";
import { parseCompanyAnouncementsDto, parseDate, parseTeamProjectsDto } from "../../Services/helpers";


const StyledAnnouncements = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #051622;
  & h1 {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
  & hr {
    width: 80;
    border: 1px solid #deb992;
  }
`;

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ mg }) => mg};
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

const initialAnnouncementsError = {
  isError: false,
  message: "",
};

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnnouncements, setIsAnnouncements] = useState(
    initialAnnouncementsError
  );
  const [user] = useRecoilState(userState);
  const [announcements, setAnnouncements] = useRecoilState(announcementsState);
  const [allProjects, setAllProjects] = useRecoilState(allProjectsState)
  

  //On initial load and whenever the announcement state is changed, make a call to the backend to update anouncements.
  useEffect(() => {
    getAnnouncements();
    getAllProjects();
  }, []);

  
    const getAllProjects = async () => {
        await getAllCompanyProjects()
        .then((serverResponse) => {
            setAllProjects(parseTeamProjectsDto(serverResponse.data))
        })
        .catch((error) => console.log(error));
    }


  const getAnnouncements = async () => {
    // console.log(user);
    await getCompanyAnnouncements(user.selectedCompany)
      .then((serverResponse) => {
        setAnnouncements(parseCompanyAnouncementsDto(serverResponse.data));
        // console.log("announcements state was set");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async () => {
    let newTitle = document.getElementById("newMessageTitle").value;
    let newMessage = document.getElementById("newMessageBody").value;
    if (newTitle.length === 0 || newMessage.length === 0) {
      setIsAnnouncements({
        ...isAnnouncements,
        isError: true,
        message: "Announcement title and message are required",
      });
    } else {
      let dateNow = parseDate(new Date());
      let newAnnouncement = createAnnouncementObject(
        user.id,
        user.firstName + " " + user.lastName,
        dateNow,
        newTitle,
        newMessage
      );
      // console.log("This is what i'm sending the backend")
      // console.log(newAnnouncement)
      createAnnouncement(newAnnouncement, user)
        .then(() => getAnnouncements())
        .catch((error) => console.log(error));
      togglePopup();
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const togglePopup = () => {
    if (isOpen) {
      setIsAnnouncements(initialAnnouncementsError);
    }
    setIsOpen(!isOpen);
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div>
        {" "}
        <NavBar />
        <StyledAnnouncements>
          <StyledHr w="100%" bd="2px solid #deb992" />
          <div>
            {!isMobile ? (
              <h1>Announcements</h1>
            ) : (
              <StyledButtonDiv>
                <h1 style={{ fontSize: "32px" }}>Announcements</h1>
                {user.isAdmin ? (
                  <Button
                    w="110.19px"
                    h="30.48px"
                    bg="#1BA098"
                    c="#FFFFFF"
                    mg="10% 0% 0% 10%"
                    onClick={togglePopup}
                  >
                    New
                  </Button>
                ) : (
                  ""
                )}
              </StyledButtonDiv>
            )}
          </div>
          {!isMobile ? (
            <StyledButtonDiv mg="0% 0% 5% 60%">
              {user.isAdmin ? (
                <Button
                  w="103px"
                  h="32px"
                  bg="#1BA098"
                  c="#FFFFFF"
                  onClick={togglePopup}
                >
                  New
                </Button>
              ) : (
                ""
              )}
            </StyledButtonDiv>
          ) : (
            ""
          )}
          <StyledHr w="80%" bd="1px solid #deb992" />
          <div>
            {announcements.map((announcement, idx) => (
              <Announcement
                announcement={announcement}
                key={idx}
                isMobile={isMobile}
              />
            ))}
          </div>
          {isOpen && (
            <Popup
              content={
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "Mulish",
                      fontWeight: "400",
                      fontSize: "16.2439px",
                      lineHeight: "150%",
                    }}
                  >
                    **name should be generated from posting user**
                  </p>
                  <h3 style={{ textAlign: "left", marginLeft: "8%" }}>Title</h3>
                  <Input id="newMessageTitle" />
                  <h3 style={{ textAlign: "left", marginLeft: "8%" }}>
                    Message
                  </h3>
                  <Input id="newMessageBody" />
                  {isAnnouncements ? (
                    <p style={{ color: "red" }}>{isAnnouncements.message}</p>
                  ) : (
                    ""
                  )}
                  <Button
                    onClick={handleSubmit}
                    w="199px"
                    h="45px"
                    bg="#1BA098"
                    c="#FFFFFF"
                    mg="3%"
                  >
                    Submit
                  </Button>
                </div>
              }
              handleClose={togglePopup}
            />
          )}
        </StyledAnnouncements>
      </div>
    );
  }
};

export default Announcements;
