import React from 'react';
import { useRouter } from "next/router";


import { Container, TabMenu } from "../../styledComponents/postBoard/PostMenu";
import { useDispatch } from "react-redux";


import {
   DELETE_POST_REQUEST,
} from "../../reducers/post";

import { frontUrl } from "../../config/config";


const PostMenu = ({ id, postId, userId }) => {
   const router = useRouter();
   const dispatch = useDispatch();

   return (
      <>
         <Container>
            <TabMenu
               onClick={() => {
                  router.push(`${frontUrl}/post/${postId}/`);
               }}
            >
               포스트페이지로 이동
        </TabMenu>
            <TabMenu
               onClick={() => {
                  router.push(`${frontUrl}/user/${userId}/`);
               }}
            >
               유저페이지로 이동
        </TabMenu>


            {id === userId && (
               <>
                  <div onClick={() => setModalShow(true)}>수정</div>
                  <div
                     onClick={() => {
                        dispatch({
                           type: DELETE_POST_REQUEST,
                           data: { postId },
                        });
                     }}
                  >
                     휴지통으로 이동
            </div>
               </>
            )}

         </Container>

      </>
   )
};

export default PostMenu;