import styled from "styled-components";

const Button = styled.button`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  margin: ${({ mg }) => mg};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10.2875px;
  color: ${({ c }) => c};
  background: ${({ bg }) => bg};
  font-family: "Mulish";
  font-style: normal;
  font-weight: 400;
  font-size: 16.2439px;
  line-height: 150%;
  // font-size: 20px;
  padding: 0;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
`;

export default Button;
