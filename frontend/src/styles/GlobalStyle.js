import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`                                                                                                                
  * {
    margin: 0;
    padding: 0; 
    box-sizing: border-box;
    font-family: 'Do Hyeon';
  }

  html {
    @media screen and (max-width: 1024px) {
      font-size: 80%;
    }

    @medai screen and (max-width: 500px) {
      font-size: 62.5%;
    }
  }
  
  canvas {
    width: 100%;
    height: 100%;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
