import { Navigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import NavBar from "../../Components/NavBar";
import { userState, projectsState } from "../../globalstate";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import Button from "../../Components/Button";
import ProjectItem from "../../Components/ProjectItem";
import Popup from "../../Components/Popup";

const StyledProjects = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background: #051622;
  position: relative;
  & span {
    position: absolute;
    width: 80px;
    height: 36px;
    left: 10px;
    top: 52px;

    font-family: "Mulish";
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
  & h1 {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 150%;
    text-align: center;
    color: #1ba098;
  }
`;

const StyledHr = styled.hr`
  width: ${({ w }) => w};
  border: ${({ bd }) => bd};
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

const StyledH3 = styled.h3`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 16.2439px;
  line-height: 150%;
  text-align: left;
  margin-left: 8%;
`;

const Project = () => {
  const [user] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useRecoilState(projectsState);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (!user.isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (user.isAdmin) {
    return <Navigate replace to="/projects" />;
  } else {
    return (
      <div>
        <NavBar />
        <StyledHr w="100%" bd="2px solid #deb992" />
        <StyledProjects>
          <Link to="/teams">
            {!isMobile ? (
              <span>&#62;Back</span>
            ) : (
              <span style={{ fontSize: "15px" }}>&#62;Back</span>
            )}
          </Link>
          {!isMobile ? (
            <h1>Projects for Team {user.selectedTeam}</h1>
          ) : (
            <h1 style={{ fontSize: "25px" }}>
              Projects for Team {user.selectedTeam}
            </h1>
          )}
        </StyledProjects>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "10%",
            paddingBottom: "10%",
          }}
        ></div>
        <div>
          {projects.map((project, idx) => (
            <ProjectItem project={project} key={idx} />
          ))}
        </div>
        {isOpen && (
          <Popup
            content={
              <div style={{ textAlign: "center" }}>
                <StyledH3>Project Name</StyledH3>
                <Input id="newProjectName" />
                <StyledH3>Description</StyledH3>
                <Input id="newDescription" />
                <Button
                  //   onClick={handleSubmit}
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
      </div>
    );
  }
};

export default Project;
