// 사용자가 액션을 일으키면 액션이 완료될 때 까지 생성되는 로딩창

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Spin } from "../../styledComponents/Loading/Loading";

import { useSelector } from "react-redux";

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
          <Spin animation="border" />
        </>
      )}
    </div>
  );
};

export default ActionLoading;
