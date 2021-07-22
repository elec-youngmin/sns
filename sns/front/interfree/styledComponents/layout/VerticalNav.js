import styled from "styled-components";

export const VerticalDiv = styled.div`
  text-align: center;
  position: fixed;

  padding: 0px;
  font-size: 30px;
  color: #6495ed;
  top:60px;
  // right: 180px;
  // height: 100%;
  @media (max-width: 985px) {
   display:none;
   
  }
 

`;

export const MenuItem = styled.div`
  padding: 10px;

  &:hover {
    border-bottom: 3px solid #6495ed;
  }
`;
