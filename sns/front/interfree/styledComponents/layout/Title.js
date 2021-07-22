import styled from "styled-components";

export const TitleDiv = styled.div`
  position:fixed;
  top:60px;
  margin-right:100px;
  text-align: center;
  @media (max-width: 985px) {
    display:none;
    
   }
  
`;

export const TitleP = styled.p`
  font-weight: 600;
  font-size: 42px;

  @media (max-width: 430px) {
    font-size: 35px;
  }
`;
