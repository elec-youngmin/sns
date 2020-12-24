import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    @import url('https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@500&display=swap');
    font-family: 'Hind Vadodara', sans-serif;
    font-size: 16px;
    font-weight: 500;
    background-color: #F5F5F5;
  }

  a {
    cursor:pointer;
  }
`;

export default GlobalStyle;
