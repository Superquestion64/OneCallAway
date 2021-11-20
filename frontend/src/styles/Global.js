import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;

  }

  font-family: 'Noto Sans', sans-serif;

  img {
    max-width: 100%;
  
  html {
    margin:0;
    padding:0;
    height:100%;
  }
}
`;

export default GlobalStyles;
