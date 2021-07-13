import styled, { keyframes } from "styled-components";

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
`;


const TabMenu = styled.div`
  display: grid;
`;

const TabRow = styled.div`
  margin: 0 auto;
`;

export { Container, TabMenu, TabRow };
