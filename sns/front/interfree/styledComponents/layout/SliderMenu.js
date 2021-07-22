import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  width: 100%;
 
  position: fixed;
  left: 0px;
  z-index: 10000;
  opacity: 1;
  background-color: white;
`;


const Div = styled.div`
`;

const TabRow = styled.div`
  margin: 0 auto;
`;

export { Container, Div, TabRow };
