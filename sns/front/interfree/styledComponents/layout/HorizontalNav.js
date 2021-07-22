import styled from "styled-components";

export const Logo = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #4169e1;
  font-size: 40px;

  cursor: pointer;
  margin-bottom: 0px;
  
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 430px) {
    font-size: 30px;
  }
  @media (max-width: 290px) {
    font-size: 25px;
  }
`;

export const DesktopNavContainer = styled.div`
  text-align: center;
  font-size: 30px;
  color: #6495ed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #d9d9d9;
  height: 55px;
  background: #f3f5f7;
`;

export const MobileContainer = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(1, auto);
  text-align: center;
  // font-size: 23px;
  color: #6495ed;
  background: #f3f5f7;
  border-bottom: 1px solid #d9d9d9;
  position: fixed;
  width:100%;
  // top: 0;
  // left: 0;
  // right: 0;
  z-index: 1000;
  height: 55px;
`;

export const LogoContainer = styled.div`
  text-align: center;
  grid-column: 3/ 5;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;

export const MobileLink = styled.a`
  color: black;
  font-size: 40px;
  margin-bottom: 10px;
`;

export const MobileSliderButton = styled.button`
  color: black;
  font-size: 20px;
  margin-bottom: 10px;
  float:left;
  grid-column: 1 / 5;
  border:0px;
`;

export const MobileUserButton = styled.button`
  color: black;
  font-size: 20px;
  margin-bottom: 10px;
  float:right;
  border:0px;
  grid-column: 1 / 5;
`;

export const AllPostLink = styled.li`
  display: inline;
  margin-right: 20px;
  margin-left: -80px;
  &:hover {
    border-bottom: 3px solid #6495ed;
  }
`;

export const MeLink = styled.li`
  display: inline;
  margin-right: 20px;
  &:hover {
    border-bottom: 3px solid #6495ed;
  }
`;

export const SearchLink = styled.li`
  display: inline;
  &:hover {
    border-bottom: 3px solid #6495ed;
  }
`;

export const SearchInput = styled.input`
  border:none;
 
`;



export const Div = styled.div`
  border: 1px solid black;
  height:100%;
  display:flex;
  align-items: center;
  justify-content:center;
`;

export const MobileSearch = styled.input`
display:inline;
 width:100%;

  // text-align: left; 
`;