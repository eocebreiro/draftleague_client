import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    background-color: #fff;
    color: #333;
    width: 100%;
  }
  
  a {
    color: #17a2b8;
    text-decoration: none;
  }
  
 
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default GlobalStyle;
