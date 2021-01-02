import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Spinner } from "react-bootstrap";

export const Spin = styled(Spinner)`
  position: fixed;
  top: 12px;
  right: 100px;
  z-index: 1000;
`;
