import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&family=Poppins&display=swap');

  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  font-family: 'Noto Sans Mono', monospace;

  img {
    max-width: 100%;
}
`;

export default GlobalStyles;
