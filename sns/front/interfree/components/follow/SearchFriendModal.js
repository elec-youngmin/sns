//친구 이메일 검색 모달

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_FRIEND_REQUEST,
  LOAD_USERPAGE_REQUEST,
} from "../../reducers/post";

import { Modal, Button, Row, Col } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

import { frontUrl } from "../../config/config";

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { search } = useSelector((state) => state.post);
  const [searchText, setSearchText] = useState("");

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 768px)",
  });

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
          <Row
            style={{
              width: "100%",
              marginTop: "12px",
            }}
          >
            <Col md={10}>
              <Typeahead
                id="basic-typeahead-multiple"
                filterBy={() => true}
                options={search}
                emptyLabel={"일치하는 결과가 여기에 표시됩니다."}
                placeholder="친구의 이메일을 검색..."
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  width: "100%",
                }}
                onChange={(selected) => {
                  console.log(selected);
                  setSearchText(selected[0]?.id);
                }}
                onInputChange={(e) => {
                  setSearchText(e);
                  dispatch({
                    type: SEARCH_FRIEND_REQUEST,
                    data: { text: e },
                  });
                }}
              />
            </Col>

            <Col md={2}>
              <Button
                class="pull-right"
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  marginTop: isTabletOrMobileDevice ? "10px" : "0px",
                  width: "100%",
                }}
                onClick={() => {
                  dispatch({
                    type: LOAD_USERPAGE_REQUEST,
                    data: searchText,
                  });
                  router.push(`${frontUrl}/user/${searchText}/`);
                  props.onHide();
                }}
              >
                <AiOutlineSearch size={15} />
              </Button>
            </Col>
          </Row>
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
