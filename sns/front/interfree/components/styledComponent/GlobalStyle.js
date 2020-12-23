import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: "#F5F5F5";
    font-size: "20px";
    text-Weight: "600";
    @import url('https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@500&display=swap');
    font-family: 'Hind Vadodara', sans-serif;
  }  
`;

export default GlobalStyle;
