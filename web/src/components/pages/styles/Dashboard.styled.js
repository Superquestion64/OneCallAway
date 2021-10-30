import styled from "styled-components";

export const Wrapper = styled.div`
  height: ${({ h }) => h || "100%"};
  width: ${({ w }) => w || "100%"};
  margin: ${({ m }) => m || "0"};
  min-height: ${({ mh }) => mh || ""};
  position: relative;
  padding: ${({ p }) => p || ""};
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  background-image: ${({ theme }) => theme.bg.dashboard};
`;
