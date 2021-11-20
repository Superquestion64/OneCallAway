import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: ${({ h }) => h || "100%"};
  width: ${({ w }) => w || "100%"};
  margin: ${({ m }) => m || "0 auto"};
  min-height: ${({ mh }) => mh || ""};
  position: relative;
  padding: ${({ p }) => p || ""};
  background: ${({ bg }) => bg || "none"};
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  color: ${({ c }) => c || "#000"};
`;

// Text
export const Title = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Ephesis&display=swap");
  font-family: "Ephesis", "cursive";
  font-size: ${({ fs }) => fs || "8rem"};
  margin: ${({ m }) => m || "3.5rem 0"};
  text-decoration: ${({ td }) => td || "none"};
`;

export const Text = styled.div`
  font-size: ${({ fs }) => fs || "1rem"};
  text-decoration: ${({ td }) => td || "none"};
  margin: ${({ m }) => m || "0"};
`;

// Styled button
export const Btn = styled.button`
  color: ${({ c }) => c || "#fff"};
  cursor: pointer;
  border-radius: ${({ br }) => br || ".6rem"};
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  font-weight: 400;
  font-size: ${({ fs }) => fs || "1.2rem"};
  line-height: 1;
  padding: ${({ p }) => p || "0.7rem 1.3rem"};
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  margin: ${({ m }) => m || 0};
  border: ${({ border }) => border || "none"};
  &:hover {
    box-shadow: 0 0 40px 40px
      ${({ boxShadowColor }) => boxShadowColor || "rgba(117, 117, 117, 0.15)"}
      inset;
    color: ${({ hoverColor }) => hoverColor || "#fff"};
    background-color: ${({ hoverBgColor }) => hoverBgColor || ""};
  }
  -webkit-transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  white-space: nowrap;
`;

// Section divider
export const Divider = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Festive&display=swap");
  text-align: center;
  font-size: 7rem;
  margin-bottom: 3.5rem;
  color: #bdbdbd;
  font-family: "Festive", cursive;
  &::after {
    content: "...";
    font-size: 7rem;
    color: #bdbdbd;
    display: block;
    text-align: center;
    letter-spacing: 0.5rem;
  }
`;

// Flex containers
export const FlexCentered = styled.div`
  height: ${({ h }) => h || "100%"};
  width: ${({ w }) => w || "100%"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: ${({ m }) => m || ""};
  padding: ${({ p }) => p || ""};
`;

export const Flex = styled.div`
  background-color: ${({ bgColor }) => bgColor || ""};
  height: ${({ h }) => h || "100%"};
  width: 100%;
  display: flex;
  justify-content: ${({ jc }) => jc || "flex-start"};
  align-items: ${({ ai }) => ai || "flex-start"};
  min-height: ${({ mh }) => mh || ""};
  border-radius: ${({ br }) => br || ""};
  flex-direction: ${({ fd }) => fd || "row"};
`;

export const FlexItem = styled.div`
  flex-grow: ${({ fg }) => fg || ""};
  height: ${({ h }) => h || "100%"};
  width: ${({ w }) => w || "100%"};
  display: ${({ d }) => d || ""};
  flex-direction: ${({ fd }) => fd || "row"};
  align-self: ${({ as }) => as || ""};
  margin: ${({ m }) => m || ""};
`;

// React router link
export const StyledLink = styled(Link)`
  color: #1565c0;
  text-decoration: none;
  &:hover {
    color: ${({ c }) => c || "#fff"};
  }
`;
