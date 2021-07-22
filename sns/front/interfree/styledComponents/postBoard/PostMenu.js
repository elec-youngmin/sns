import styled from "styled-components";

const Container = styled.div`
display: grid;
grid-template-columns: repeat(1, 1fr);
grid-template-rows: repeat(1, auto);
width: 100%;
position: fixed;
bottom: 0px;
left: 0px;
z-index: 10000;
opacity: 1;
background-color: white;
text-align:center;
`;

const TabMenu = styled.div`
font-size:25px;
color:#283B3E;
font-weight:700;
`;

const TabRow = styled.div`
  margin: 0 auto;
`;

export { Container, TabMenu, TabRow };
