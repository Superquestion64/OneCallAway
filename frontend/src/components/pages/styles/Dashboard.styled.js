import styled from "styled-components";

export const Wrapper = styled.div`
  height: ${({ h }) => h || "100%"};
  width: ${({ w }) => w || "100%"};
  margin: ${({ m }) => m || "0"};
  min-height: ${({ mh }) => mh || ""};
  position: relative;
  padding: ${({ p }) => p || ""};
  background-color: ${({ bgColor }) => bgColor || "#fff"};
  background-image: ${({ theme }) => theme.bg.dashboard || "linear-gradient(to top, #AAD8D3 45%, #AAD8D3 1%, #00ADB5 100%)"};
`;
