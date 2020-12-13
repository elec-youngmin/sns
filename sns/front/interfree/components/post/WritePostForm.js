import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import PropTypes from "prop-types";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";

import {
  IMAGE_SAVE_REQUEST,
  UPLOAD_VIDEO_REQUEST,
  SAVE_POST_REQUEST,
} from "../../reducers/post";

import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import {
  BsQuestion,
  BsPeople,
  BsPerson,
  BsCardImage,
  BsCameraVideo,
} from "react-icons/bs";

const WritePostAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            #로 시작하면 해시태그를 공유할 수 있어요. <br />
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <BsQuestion />
        </span>
      </OverlayTrigger>
    </>
  );
};

const MultiPostAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            멀티미디어는 200MB까지 올리실 수 있어요. <br />
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <BsQuestion />
        </span>
      </OverlayTrigger>
    </>
  );
};

const WriteForm = (props) => {
  const [isPostEmpty, SetIsPostEmpty] = useState(false);
  const [image, SetImage] = useState(""); //프리뷰
  const [img, SetImg] = useState("");
  const [video, SetVideo] = useState("");
  const [vid, SetVid] = useState(false); //프리뷰
  const [onlyReadMy, setOnlyReadMy] = useState(false);
  const [onlyReadMyIcon, setOnlyReadMyIcon] = useState(<BsPeople />);

  const { imageSaveError } = useSelector((state) => state.post);

  useMemo(() => {
    if (imageSaveError) {
      alert("용량이 초과했거나 에러가 발생했습니다.");
    }
  }, [imageSaveError]);

  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.user.user);
  // console.log(posts[0].contents);
  const [post, setPost] = useState();

  let iFormData = new FormData(); //이미지
  let vFormData = new FormData(); //동영상

  const onChangeImages = useCallback((e) => {
    iFormData.append("image", e.target.files[0]);
    SetImg(e.target.files[0]);
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      SetImage({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
    dispatch({
      type: IMAGE_SAVE_REQUEST,
      data: iFormData,
    });
  });

  const onChangeVideo = useCallback((e) => {
    vFormData.append("video", e.target.files[0]);
    SetVideo(e.target.files[0]);
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      SetVid({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
    dispatch({
      type: UPLOAD_VIDEO_REQUEST,
      data: vFormData,
    });
  });

  const onPostChange = (e) => {
    setPost(e.target.value);
    // e.target.value += transcript;
    console.log(e.target.value);
  };

  const textarea = useRef();

  // console.log(textarea.current);

  // textarea.current = "adfasdf";
  return (
    <>
      {/* 느낌표 알림창 */}
      <WritePostAlert style={{ float: "right" }} />

      <Form style={{ marginBottom: "50px" }}>
        <Form.Group>
          <Form.Control
            as="textarea"
            style={{ resize: "none" }}
            rows={5}
            multiple
            placeholder="포스트를 작성해보세요."
            onChange={onPostChange}
            ref={textarea}
            // defaultValue={transcript}
          />
        </Form.Group>
        {image && !imageSaveError && (
          <img
            className="profile_preview"
            src={image.previewURL}
            style={{ maxWidth: "30vw", maxHeight: "30vh" }}
          ></img>
        )}
        {vid && (
          <video
            id="myVideo"
            src={vid.previewURL}
            controls
            autoplay
            style={{
              maxWidth: "55vw",
              maxHeight: "50vw",
            }}
          ></video>
        )}

        {isPostEmpty && (
          <>
            <div class="alert alert-primary" role="alert">
              글이 작성되지 않아서 저장을 할 수 없었어요. 글이 작성되었는지
              확인해주세요.
            </div>
          </>
        )}

        {/* 여기부터 멀티미디어 아이콘 버튼 2개 (이미지, 비디오) */}
        <form enctype="multipart/form-data">
          {/* 이미지 아이콘 */}
          <label for="imgUpload">
            <BsCardImage size={40} className="mr-4" />
          </label>
          <input
            type="file"
            id="imgUpload"
            role="button"
            onChange={onChangeImages}
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            style={{ display: "none", marginRignt: "20px" }}
          ></input>
          {/* 비디오 아이콘 */}

          <label for="videoUpload">
            <BsCameraVideo size={40} />
          </label>
          <input
            type="file"
            id="videoUpload"
            role="button"
            onChange={onChangeVideo}
            accept="video/*"
            style={{ display: "none", margin: "20px" }}
          ></input>
          <MultiPostAlert />
          {/* 여기부터 저장버튼과 드롭다운 버튼 */}
          <Button
            type="submit"
            variant="primary"
            className="float-right"
            style={{
              marginLeft: "30px",
            }}
            onClick={(e) => {
              const formData = new FormData();
              formData.append("img", img);
              formData.append("video", video);
              formData.append("post", post);
              formData.append("id", id);
              formData.append("onlyReadMy", onlyReadMy);
              // console.log(img);
              if (!post) {
                SetIsPostEmpty(true);
                e.preventDefault();
              } else {
                dispatch({
                  type: SAVE_POST_REQUEST,
                  data: formData,

                  // { post, id, onlyReadMy },
                });
                e.preventDefault();
                SetIsPostEmpty(false);
              }
            }}
          >
            저장
          </Button>

          <DropdownButton
            variant="light"
            className="float-right"
            title={onlyReadMyIcon}
            drop="left"
          >
            <Dropdown.Item
              onClick={() => {
                setOnlyReadMy(false);
                setOnlyReadMyIcon(<BsPeople />);
              }}
            >
              <BsPeople />
              전체 보기
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setOnlyReadMy(true);
                setOnlyReadMyIcon(<BsPerson />);
              }}
            >
              <BsPerson />
              나만 보기
            </Dropdown.Item>
          </DropdownButton>
        </form>
      </Form>
    </>
  );
};

export default WriteForm;
