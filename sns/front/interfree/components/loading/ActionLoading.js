import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

const ActionLoading = () => {
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
    followUserLoading,
    unFollowUserLoading,
  } = useSelector((state) => state.post);

  const {
    logOutLoading,
    destroyUserLoading,
    profileImageUploadLoading,
    changeProfileLoading,
    findPasswordLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setRouteLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setRouteLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setRouteLoading(false);
    });
  }, [router]);
  return (
    <div>
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
              top: "30px",
              right: "70px",
              zIndex: "100",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ActionLoading;
