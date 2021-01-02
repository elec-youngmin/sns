import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const Spin = styled(Spinner)`
  position: fixed;
  top: 12px;
  right: 100px;
  z-index: 1000;
`;
