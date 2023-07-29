import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`                                                                                                                
  * {
    margin: 0;
    padding: 0; 
    box-sizing: border-box;
    font-family: 'Do Hyeon';
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
