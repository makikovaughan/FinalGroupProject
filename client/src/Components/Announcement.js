import { Fragment } from "react";
import styled from "styled-components";

const StyledAnnouncements = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  width: ${({ w }) => w};
  background: #0b2d45;
  border-radius: 20px;
`;

const StyledSpan = styled.span`
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  color: #ffffff;
`;

const StyledP = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
  margin-left: 5%;
  margin-right: 5%;
`;

const StyledUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ jf }) => jf};
`;

const Announcement = ({ announcement, idx, isMobile }) => {
  return (
    <Fragment>
      {!isMobile ? (
        <StyledAnnouncements w="730px">
          <StyledUser key={idx} jf="space-around">
            <StyledSpan>{announcement.author}</StyledSpan>
            <StyledSpan>{announcement.dateCreated}</StyledSpan>
          </StyledUser>
          <StyledP>{announcement.title}</StyledP>
          <StyledP>{announcement.message}</StyledP>
        </StyledAnnouncements>
      ) : (
        <StyledAnnouncements w="422.02px">
          <StyledUser key={idx} jf="center">
            <StyledSpan style={{ marginRight: "5%" }}>
              {announcement.author}
            </StyledSpan>
            <StyledSpan>{announcement.dateCreated}</StyledSpan>
          </StyledUser>
          <StyledP>{announcement.title}</StyledP>
          <StyledP>{announcement.message}</StyledP>
        </StyledAnnouncements>
      )}
    </Fragment>
  );
};

export default Announcement;
