import styled from "styled-components";

export const VerticalDiv = styled.div`
  text-align: center;
  padding: 0px;
  text-align: center;
  font-size: 30px;
  color: #6495ed;
  position: fixed;
  top: 55px;
  left: 0;
  height: 100%;
  border-top: none;
  border-right: 1px solid #d9d9d9;
`;

export const MenuItem = styled.div`
  padding: 10px;
  &:hover {
    border-bottom: 3px solid #6495ed;
  }
`;
