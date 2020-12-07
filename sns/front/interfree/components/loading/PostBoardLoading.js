import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

const PostBoardLoading = () => {
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);
  const {
    loadAllPostLoading,
    loadPostLoading,
    savePostLoading,
    updatePostLoading,
    deletePostLoading,
    loadTrashLoading,
    deleteAlltrashLoading,
    restoreAlltrashLoading,
    addCommentLoading,
    deleteCommentLoading,
    imageSaveLoading,
    uploadVideoLoading,
    countReportLoding,
    addBookmarkLoading,
    likePostLoading,
    cancelLikePostLoading,
    cancelBookmarkLoading,
    loadCommentLoading,
    loadOneuserChartdataLoading,
    loadChartdataLoading,
    loadHashtagPageLoding,
    loadUserPageLoding,
  } = useSelector((state) => state.post);

  const {
    logOutLoading,
    destroyUserLoading,
    profileImageUploadLoading,
    changeProfileLoading,
    findPasswordLoading,
    followUserLoading,
    unFollowUserLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setRouteLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setRouteLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setRouteLoading(false);
    });
  }, [router]);
  const notify = () => toast("Wow so easy !");
  return (
    <div>
      <ToastContainer autoClose={2000} />

      {(routeLoading ||
        loadAllPostLoading ||
        loadPostLoading ||
        savePostLoading ||
        updatePostLoading ||
        deletePostLoading ||
        loadTrashLoading ||
        deleteAlltrashLoading ||
        restoreAlltrashLoading ||
        addCommentLoading ||
        deleteCommentLoading ||
        imageSaveLoading ||
        uploadVideoLoading ||
        countReportLoding ||
        addBookmarkLoading ||
        likePostLoading ||
        cancelLikePostLoading ||
        cancelBookmarkLoading ||
        loadCommentLoading ||
        loadOneuserChartdataLoading ||
        loadChartdataLoading ||
        loadHashtagPageLoding ||
        loadUserPageLoding ||
        unFollowUserLoading ||
        logOutLoading ||
        destroyUserLoading ||
        profileImageUploadLoading ||
        changeProfileLoading ||
        findPasswordLoading ||
        followUserLoading) && (
        <>
          <Spinner
            animation="border"
            style={{
              position: "fixed",
              top: "100px",
              right: "70px",
              zIndex: "100",
            }}
          />
        </>
      )}
    </div>
  );
};

export default PostBoardLoading;
