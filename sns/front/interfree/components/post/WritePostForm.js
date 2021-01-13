//포스트 작성 폼

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import FormData from "form-data";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";

import { useDispatch, useSelector } from "react-redux";

import {
  IMAGE_SAVE_REQUEST,
  UPLOAD_VIDEO_REQUEST,
  SAVE_POST_REQUEST,
} from "../../reducers/post";

import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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
            멀티미디어는 200MB까지 올리실 수 있어요.
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

const WriteForm = () => {
  const dispatch = useDispatch();

  const [isPostEmpty, SetIsPostEmpty] = useState(false);
  const [image, SetImage] = useState(""); //프리뷰
  const [img, SetImg] = useState("");
  const [video, SetVideo] = useState("");
  const [vid, SetVid] = useState(false); //프리뷰
  const [onlyReadMy, setOnlyReadMy] = useState(false);
  const [onlyReadMyText, setOnlyReadMyText] = useState("전체공개");
  const [onlyReadMyIcon, setOnlyReadMyIcon] = useState(<BsPeople />);

  const { imageSaveError, savePostDone } = useSelector((state) => state.post);

  useMemo(() => {
    if (imageSaveError) {
      alert("용량이 초과했거나 에러가 발생했습니다.");
    }
  }, [imageSaveError]);

  const { id } = useSelector((state) => state.user.user);
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

  useEffect(() => {
    textarea.current.focus();
    console.log(textarea.current);
  }, []);

  const textarea = useRef();

  return (
    <>
      {/* 느낌표 알림창 */}
      <WritePostAlert style={{ float: "right" }} />

      <Form style={{ marginBottom: "50px" }}>
        <Form.Group>
          <Form.Control
            as="textarea"
            style={{
              resize: "none",
              boxShadow: "1px 1px 3px 3px #F8F8FF",
              borderRadius: "12px",
            }}
            rows={5}
            multiple
            placeholder="포스트를 작성해보세요."
            onChange={onPostChange}
            ref={textarea}
          />
        </Form.Group>

        {image && !imageSaveError && (
          <img
            className="profile_preview"
            src={image.previewURL}
            alt={image.previewURL}
            style={{ maxWidth: "30vw", maxHeight: "30vh", corsor: "pointer" }}
          ></img>
        )}
        {vid && (
          <video
            id="myVideo"
            src={vid.previewURL}
            controls
            autoplay
            style={{
              maxWidth: "40vw",
              maxHeight: "50vw",
              cursor: "pointer",
              boxSizing: "content-box",
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
            <BsCardImage
              size={30}
              style={{
                cursor: "pointer",
                marginRight: "10px",
              }}
            />
          </label>

          <input
            type="file"
            id="imgUpload"
            role="button"
            onChange={onChangeImages}
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            style={{ display: "none", marginRignt: "20px", cursor: "pointer" }}
          ></input>
          {/* 비디오 아이콘 */}

          <label for="videoUpload">
            <BsCameraVideo
              size={30}
              style={{
                cursor: "pointer",
                marginRight: "10px",
              }}
            />
          </label>

          <input
            type="file"
            id="videoUpload"
            role="button"
            onChange={onChangeVideo}
            accept="video/*"
            style={{ display: "none", margin: "20px", cursor: "pointer" }}
          ></input>
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

          <Dropdown
            trigger={["click"]}
            // visible={false}
            overlay={
              <Menu
                onSelect={(key) => {
                  if (Number(key.key) == 1) {
                    setOnlyReadMyIcon(<BsPeople />);
                    setOnlyReadMyText("전체공개");
                  }
                  if (Number(key.key) == 2) {
                    setOnlyReadMyIcon(<BsPerson />);
                    setOnlyReadMyText("나만보기");
                  }
                }}
              >
                <MenuItem
                  key="1"
                  onClick={() => {
                    setOnlyReadMyIcon(<BsPeople />);
                  }}
                >
                  <BsPeople /> 전체공개
                </MenuItem>
                <Divider />
                <MenuItem key="2">
                  <BsPerson />
                  나만 보기
                </MenuItem>
              </Menu>
            }
            animation="slide-up"
            onVisibleChange={(visible) => {
              console.log(visible);
            }}
          >
            <Button
              style={{ background: "white", color: "black", border: "none" }}
            >
              {onlyReadMyIcon}
              {onlyReadMyText}
            </Button>
          </Dropdown>
        </form>
      </Form>
    </>
  );
};

export default WriteForm;
