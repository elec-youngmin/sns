import React, { useState, useMemo } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_INPUT_TEXT_REQUEST,
  SEARCH_RESULT_REQUEST,
} from "../../reducers/post";

import { Button, Row, Col } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

import { frontUrl } from "../../config/config";

const Search = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { search, searchResultDone, searchResultError } = useSelector(
    (state) => state.post
  );
  const router = useRouter();

  useMemo(() => {
    if (searchResultDone) {
      router.push(`${frontUrl}/searchResult/${searchText}/`);
    }
  }, [searchResultDone]);

  return (
    <>
      <Row
        style={{
          width: "100%",
          marginTop: "12px",
        }}
      >
        <Col md={10}>
          <Typeahead
            filterBy={() => true}
            options={search}
            placeholder="검색할 포스트 내용을 검색..."
            style={{
              display: "inline-block",
              marginRight: "10px",
              width: "100%",
            }}
            onChange={(selected) => {
              setSearchText(selected[0].label);
            }}
            onInputChange={(e) => {
              if (e.length > 1) {
                dispatch({
                  type: SEARCH_INPUT_TEXT_REQUEST,
                  data: { text: e },
                });
              }
            }}
          />
        </Col>
        <Col md={2}>
          <Button
            class="pull-right"
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginTop: "10px",
              width: "100%",
            }}
            onClick={() => {
              dispatch({
                type: SEARCH_RESULT_REQUEST,
                data: searchText,
              });
            }}
          >
            <AiOutlineSearch size={15} />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Search;
