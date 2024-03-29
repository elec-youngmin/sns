import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 100;
  opacity: 1;
  background-color: white;
`;

const TabMenu = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
`;

const TabRow = styled.div`
  margin: 0 auto;
`;

export { Container, TabMenu, TabRow };
