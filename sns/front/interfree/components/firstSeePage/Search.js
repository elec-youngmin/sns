import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_INPUT_TEXT_REQUEST,
  SEARCH_RESULT_REQUEST,
} from "../../reducers/post";

import { Form, Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.post);

  return (
    <>
      <Typeahead
        filterBy={() => true}
        options={search}
        placeholder="포스트 검색"
        style={{ display: "inline-block", marginLeft: "60px" }}
        onInputChange={(e) => {
          if (e.length > 1) {
            dispatch({
              type: SEARCH_INPUT_TEXT_REQUEST,
              data: { text: e },
            });
          }
        }}
      />
      <Button class="pull-right" style={{}}>
        <AiOutlineSearch />
      </Button>
    </>
  );
};

export default Search;
