import React from "react";

import Search from "./Search";

import { Modal, Button, Row, Col } from "react-bootstrap";

const SearchModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">검색</Modal.Title>
        </Modal.Header>
        <Modal.Body
          class="container justify-content-center"
          style={{
            padding: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search />
        </Modal.Body>
        <Modal.Footer class="col-lg-12">
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SearchModal;
