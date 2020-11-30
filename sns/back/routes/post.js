const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  Post,
  User,
  PostImgSrc,
  Comment,
  Report,
  Bookmark,
  sequelize,
  Sequelize,
  Follow,
  Like,
  PostVideoSrc,
  Hashtag,
  ProfileImgSrc,
} = require("../models");
const Op = Sequelize.Op;
const router = express.Router();
const { QueryTypes, json } = require("sequelize");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/");
      console.log(req.files);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 500 * 1024 * 1024 }, //500메가까지 업로드 할 수 있음.
});

router.post(
  "/save",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const postId = await Post.create({
        contents: req.body.post,
        UserId: req.body.id,
        onlyReadMy: req.body.onlyReadMy,
      });

      if (req.body.img == undefined) {
        await PostImgSrc.create({
          src: req.files.img[0].filename,
          PostId: postId.dataValues.id,
        });
      }

      if (req.body.video == undefined) {
        await PostVideoSrc.create({
          src: req.files.video[0].filename,
          PostId: postId.dataValues.id,
        });
      }

      const hashtags = req.body.post.match(/#[^\s#]+/g);

      // if (hashtags) {
      //   await Hashtag.create({
      //     tag: hashtags,
      //   });
      // }

      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { tag: tag.slice(1).toLowerCase() },
            })
          ) //slice(1)은 해시태그 때기, 글짜만 저장
        ); //result 값은 [[노드,true],[리액트,true]]
        await postId.addHashtags(result.map((v) => v[0]));
      }

      // if (hashtags) {
      //   await Hashtag.create({
      //     tag: hashtags,
      //   });
      // }

      const post = await Post.findAll({
        where: { UserId: req.body.id },
        // limit: 10,
        order: [["id", "DESC"]],
        attributes: { exclude: ["updatedAt", "deletedAt"] },
        include: [
          {
            model: User,
            attributes: ["id", "nickname"],
            include: [
              {
                model: ProfileImgSrc,
                attributes: ["src"],
              },
            ],
          },
          {
            model: Like,
            attributes: ["id", "LikeUserId", "PostId"],
            where: { LikeUserId: req.body.id },
            required: false,
          },
          {
            model: PostImgSrc,
            attributes: ["src"],
          },
          {
            model: PostVideoSrc,
            attributes: ["src"],
          },
          {
            model: Report,
          },
          {
            model: Bookmark,
            attributes: ["UserId", "PostId"],
            where: { UserId: req.body.id },
            required: false,
          },
        ],
      });
      res.status(200).json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.post("/load", async (req, res, next) => {
  try {
    console.log("콘솔로 찍ㅇㅇ", req.body);
    let where;

    if (Object.keys(req.body).length === 0)
      where = {
        UserId: req.user.dataValues.id,
      };

    if (Object.keys(req.body).length != 0)
      where = {
        UserId: req.body.id.userId,
        id: { [Op.lt]: req.body.id.lastId },
      };

    const post = await Post.findAll({
      where,
      limit: 10,
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          required: false,
          attributes: ["id", "LikeUserId", "PostId"],
          where: { LikeUserId: req.user.dataValues.id },
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          required: false,
          attributes: ["UserId", "PostId"],
          where: { UserId: req.user.dataValues.id },
        },
      ],
    });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/allPostLoad", async (req, res, next) => {
  try {
    let where;

    if (Object.keys(req.body).length === 0)
      where = {
        onlyReadMy: 0,
      };

    if (Object.keys(req.body).length != 0)
      where = {
        id: { [Op.lt]: req.body.id.lastId },
        onlyReadMy: 0,
      };

    const allPost = await Post.findAll({
      where,
      limit: 10,
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          where: { disabled: false },
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
            {
              model: Follow,
              required: false,
              where: { followerId: req.user.dataValues.id },
            },
          ],
        },

        {
          model: Like,
          required: false,
          attributes: ["id", "LikeUserId", "PostId"],
          where: { LikeUserId: req.user.dataValues.id },
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          required: false,
          attributes: ["UserId", "PostId"],
          where: { UserId: req.user.dataValues.id },
        },
      ],
    });
    res.status(200).json(allPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/updatePost", async (req, res, next) => {
  try {
    await Post.update(
      { contents: req.body.post },
      {
        where: { id: req.body.postId },
      }
    );
    const userId = await Post.findOne({
      attributes: ["UserId"],
      where: { id: req.body.postId },
    });

    const post = await Post.findAll({
      where: { UserId: userId.dataValues.UserId },
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          // where: { LikeUserId: req.body.id },
        },
        {
          model: PostImgSrc,
        },
        {
          model: PostVideoSrc,
        },
        {
          model: Bookmark,
          attributes: ["UserId", "PostId"],
        },
        {
          model: Report,
        },
      ],
    });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/deletePost", async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.body.postId,
      },
    });
    const result = await Post.findOne({
      where: {
        id: req.body.postId,
      },
    });
    res.status(200).json(req.body.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/loadTrash", async (req, res, next) => {
  try {
    const [trashPosts, metadata] = await sequelize.query(
      `SELECT postvideosrc.src AS videoSrc, postimgsrc.src AS imgSrc, posts.contents, posts.onlyReadMy, posts.id AS postId, posts.createdAt FROM postvideosrc RIGHT OUTER JOIN postimgsrc on postvideosrc.PostId=postimgsrc.PostId right OUTER JOIN posts on postimgsrc.PostId=posts.Id WHERE (posts.UserId = ${req.body.userId} AND posts.deletedAt IS NOT NULL)`
    );

    res.status(200).json(trashPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/deleteAllTrash", async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        UserId: req.body.id,
        deletedAt: {
          [Op.ne]: null,
        },
      },
      force: true,
    });
    res.status(200).json("성공적으로 모두삭제됨");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/deleteTrashPost", async (req, res, next) => {
  try {
    console.log(req.body);
    await Post.destroy({
      where: {
        id: req.body.postId,
      },
      force: true,
    });
    res.status(200).json("성공적으로 삭제됨");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/restoreAllTrash", async (req, res, next) => {
  try {
    const [restore] = await sequelize.query(
      `UPDATE posts AS Post SET deletedAt=null WHERE UserId=${req.user.deid} AND deletedAt IS NOT NULL`
    );

    res.status(200).json("성공적으로 모두 포스트로 이동함");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/restoreTrashPost", async (req, res, next) => {
  try {
    const [restore] = await sequelize.query(
      `UPDATE posts AS Post SET deletedAt=null WHERE id=${req.body.postId} AND deletedAt IS NOT NULL`
    );

    res
      .status(200)
      .json(`${req.body.postId}번 쓰레기 포스트가 성공적으로 포스트로 이동함`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/addComment", async (req, res, next) => {
  try {
    await Comment.create({
      comment: req.body.comment,
      PostId: req.body.postOneId,
      writeUserId: req.body.id,
    });

    const CommentAll = await Comment.findAll({
      where: { PostId: req.body.postOneId },
      include: [
        {
          model: Post,
          attributes: ["id"],
          include: [{ model: User, attributes: ["nickname"] }],
        },
      ],
    });

    res.status(200).json(CommentAll);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/loadComment", async (req, res, next) => {
  try {
    const CommentAll = await Comment.findAll({
      where: { PostId: req.body.postId },
      include: [
        {
          model: Post,
          attributes: ["id"],
          include: [{ model: User, attributes: ["nickname"] }],
        },
      ],
    });

    res.status(200).json(CommentAll);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//삭제를 요청한 유저 ID를 comment 테이블의 writeUserId로 조회해서 일치하면 삭제
router.post("/deleteComment", async (req, res, next) => {
  try {
    const CommentAll = await Comment.destroy({
      where: { id: req.body.CommentId },
    });

    res.status(200).json(req.body.CommentId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/updateComment", async (req, res, next) => {
  try {
    await Comment.update(
      { comment: req.body.comment },
      { where: { id: req.body.commentId } }
    );

    const CommentAll = await Comment.findAll({
      where: { PostId: req.body.postId },
      include: [
        {
          model: Post,
          attributes: ["id"],
          include: [{ model: User, attributes: ["nickname"] }],
        },
      ],
    });

    res.status(200).json(CommentAll);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//req.body.id=>UserId req.body.dataType
router.post("/addBookmark", async (req, res, next) => {
  try {
    await Bookmark.create({
      UserId: req.body.id,
      PostId: req.body.postId,
    });

    // UserId: req.body.id,
    const OnePost = await Post.findAll({
      where: { id: req.body.postId },
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id", "LikeUserId", "PostId"],
          // where: { UserId: req.body.id },
          require: false,
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          attributes: ["UserId", "PostId"],
          where: { UserId: req.body.id },
          require: false,
        },
      ],
    });
    if (req.body.dataType === "allPosts") {
      OnePost[0].dataValues.dataType = "allPosts";
    }
    if (req.body.dataType === "posts") {
      OnePost[0].dataValues.dataType = "posts";
    }

    if (req.body.dataType === "bookmark") {
      OnePost[0].dataValues.dataType = "bookmark";
    }

    if (req.body.dataType === "follow") {
      OnePost[0].dataValues.dataType = "follow";
    }

    if (req.body.dataType === "hashtagPosts") {
      OnePost[0].dataValues.dataType = "hashtagPosts";
    }

    res.status(200).json(OnePost);
  } catch (err) {
    console.error(err);
  }
});

//id,postId/ id는 userId 북마크를 취소함
router.post("/cancelBookmark", async (req, res, next) => {
  try {
    await Bookmark.destroy({
      where: {
        UserId: req.body.id,
        PostId: req.body.postId,
      },
    });

    const OnePost = await Post.findAll({
      where: { id: req.body.postId },
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id", "LikeUserId", "PostId"],
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
        },
      ],
    });

    if (req.body.dataType === "allPosts") {
      OnePost[0].dataValues.dataType = "allPosts";
    }

    if (req.body.dataType === "posts") {
      OnePost[0].dataValues.dataType = "posts";
    }

    if (req.body.dataType === "bookmark") {
      OnePost[0].dataValues.dataType = "bookmark";
    }

    if (req.body.dataType === "follow") {
      OnePost[0].dataValues.dataType = "follow";
    }

    if (req.body.dataType === "hashtagPosts") {
      OnePost[0].dataValues.dataType = "hashtagPosts";
    }

    console.log(OnePost);
    res.status(200).json(OnePost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/loadBookmark", async (req, res, next) => {
  try {
    let where;
    if (req.body.lastId === undefined)
      where = {
        UserId: req.body.userId,
      };

    if (req.body.lastId) {
      where = {
        UserId: req.body.userId,
        id: { [Op.lt]: req.body.lastId },
      };
    }
    const result = await Post.findAll({
      where,
      limit: 10,
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id", "LikeUserId", "PostId"],
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          where: { UserId: req.body.userId },
        },
      ],
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/image", upload.single("image"), (req, res, next) => {
  // if (req.file.size > 1000000) {
  //   json.status(500).json("용량이 초과했습니다. 10mb 까지 허용합니다.");
  // }
  res.status(200).json("성공적으로 업로드했습니다.");
});

router.post("/uploadVideo", upload.single("video"), (req, res, next) => {
  console.log(req.files);
  res.json("ok");
});

router.post("/likePost", async (req, res, next) => {
  try {
    await Like.create({
      LikeUserId: req.body.userId,
      PostId: req.body.postId,
    });
    await Post.increment({ like: 1 }, { where: { id: req.body.postId } });

    const result = await Post.findOne({
      where: { id: req.body.postId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          where: { LikeUserId: req.body.userId },
          require: false,
        },
        {
          model: PostImgSrc,
        },
        {
          model: PostVideoSrc,
        },
        {
          model: Report,
          limit: 1,
          attributes: ["count"],
        },
        {
          model: Bookmark,
          attributes: ["UserId", "PostId"],
          // where: { UserId: req.body.userId },
          // require: false,
        },
      ],
    });
    console.log(result.dataValues);
    if (req.body.dataType === "allPosts") {
      result.dataValues.dataType = "allPosts";
    }

    if (req.body.dataType === "posts") {
      result.dataValues.dataType = "posts";
    }

    if (req.body.dataType === "bookmark") {
      result.dataValues.dataType = "bookmark";
    }

    if (req.body.dataType === "follow") {
      result.dataValues.dataType = "follow";
    }

    if (req.body.dataType === "hashtagPosts") {
      result.dataValues.dataType = "hashtagPosts";
    }

    console.log(result.dataValues);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/cancelLikePost", async (req, res, next) => {
  try {
    console.log(req.body);
    await Like.destroy({
      where: {
        LikeUserId: req.body.userId,
        PostId: req.body.postId,
      },
    });

    await Post.decrement({ like: 1 }, { where: { id: req.body.postId } });

    const result = await Post.findOne({
      where: { id: req.body.postId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          // where: { LikeUserId: req.body.userId },
        },
        {
          model: PostImgSrc,
        },
        {
          model: PostVideoSrc,
        },
        {
          model: Report,
          limit: 1,
          attributes: ["count"],
        },
        {
          model: Bookmark,
          // where: { UserId: req.body.userId },
        },
      ],
    });

    if (req.body.dataType === "allPosts") {
      result.dataValues.dataType = "allPosts";
    }

    if (req.body.dataType === "posts") {
      result.dataValues.dataType = "posts";
    }

    if (req.body.dataType === "bookmark") {
      result.dataValues.dataType = "bookmark";
    }

    if (req.body.dataType === "follow") {
      result.dataValues.dataType = "follow";
    }

    if (req.body.dataType === "hashtagPosts") {
      result.dataValues.dataType = "hashtagPosts";
    }
    console.log(result.dataValues);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//로그인한 유저아이디를 찾고 팔로워들의 포스트를 로드함.
//req.body.userId
router.post("/loadFollowsPost", async (req, res, next) => {
  try {
    const [FollowUsers, metadata] = await sequelize.query(
      `SELECT * FROM users INNER JOIN follows on follows.followingId=users.id where follows.followerId=${req.body.userId}`
    );
    // SELECT * FROM profileimgsrcs RIGHT JOIN users on profileimgsrcs.UserId=users.id INNER JOIN follows on follows.followingId=users.id where follows.followerId=2

    const FollowUsersMap = FollowUsers.map(async (e) => {
      const [src, metadataz] = await sequelize.query(
        `SELECT src FROM profileimgsrcs where UserId=${e.followingId}`
      );

      const [postsCount, metadata0] = await sequelize.query(
        `SELECT count(id) AS postsCount FROM posts where UserId=${e.followingId}`
      );
      const [followCount, metadata1] = await sequelize.query(
        `SELECT count(followerId) AS followCount FROM follows where followerId=${e.followingId}`
      );
      const [followingCount, metadata2] = await sequelize.query(
        `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${e.followingId}`
      );

      if (src.length === 0) {
        e.src = "userImage.jpg";
      } else {
        e.src = src[0].src;
      }

      e.postsCount = postsCount[0].postsCount;
      e.followCount = followCount[0].followCount;
      e.followingCount = followingCount[0].followingCount;

      return e;
    });

    const FollowUserInfo = await Promise.all(FollowUsersMap);

    res.status(200).json(FollowUserInfo);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/loadUserPage/:id", async (req, res, next) => {
  try {
    console.log(req.params.id); //userId
    const posts = await Post.findAll({
      where: { UserId: req.params.id },
      order: [["id", "DESC"]],
      limit: 3,
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          // where: { disabled: false },
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id", "LikeUserId", "PostId"],
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          attributes: ["UserId", "PostId"],
        },
      ],
    });

    const [postsCount, metadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.params.id}`
    );

    const [followCount, metadata1] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.params.id}`
    );

    const [followingCount, metadata2] = await sequelize.query(
      `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${req.params.id}`
    );

    posts[0].dataValues.User.dataValues.postsCount = postsCount[0].postsCount;
    posts[0].dataValues.User.dataValues.followCount =
      followCount[0].followCount;
    posts[0].dataValues.User.dataValues.followingCount =
      followingCount[0].followingCount;

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/loadHashtagPage/:tag", async (req, res, next) => {
  try {
    const hashtagPost = await Hashtag.findAll({
      where: { tag: req.params.tag },
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              include: [
                {
                  model: ProfileImgSrc,
                  attributes: ["src"],
                },
              ],
            },
            {
              model: Like,
              required: false,
              attributes: ["id", "LikeUserId", "PostId"],
              where: { LikeUserId: req.user.dataValues.id },
            },
            {
              model: PostImgSrc,
              attributes: ["src"],
            },
            {
              model: PostVideoSrc,
              attributes: ["src"],
            },
            {
              model: Report,
            },
            {
              model: Bookmark,
              required: false,
              attributes: ["UserId", "PostId"],
              where: { UserId: req.user.dataValues.id },
            },
          ],
        },
      ],
    });

    res.status(200).json(hashtagPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/countReport", async (req, res, next) => {
  try {
    await Report.create({
      content: req.body.report,
      postId: req.body.postId,
    });

    const [
      result,
      metadata,
    ] = await sequelize.query(
      ` SELECT count(PostId) from reports where PostId=${req.body.postId} group by PostId`,
      { type: QueryTypes.SELECT, raw: false }
    );

    await Report.update(
      { count: result["count(PostId)"] },
      {
        where: { postId: req.body.postId },
      }
    );

    const report = await Report.findOne({
      where: { postId: req.body.postId },
      attributes: ["count"],
    });

    res.status(200).json(report);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

router.get("/loadChartdata", async (req, res, next) => {
  try {
    let chartData = {
      postsData: {},
      commentsData: {},
      likes: {},
      reports: {},
    };
    const [posts, metadata] = await sequelize.query(
      "SELECT distinct count(id) as count, date(createdAt) as date from posts group by date(createdAt)"
    );

    const [comments, metadata1] = await sequelize.query(
      "SELECT distinct count(id) as count, date(createdAt) as date from comments group by date(createdAt)"
    );

    const [likes, metadata2] = await sequelize.query(
      "SELECT distinct count(id) as count, date(createdAt) as date from likes group by date(createdAt)"
    );

    const [reports, metadata3] = await sequelize.query(
      "SELECT distinct count(id) as count, date(createdAt) as date from reports group by date(createdAt)"
    );

    chartData.postsData = posts;
    chartData.commentsData = comments;
    chartData.likesData = likes;
    chartData.reportsData = reports;

    res.status(200).json(chartData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/oneuserLoadChartdata", async (req, res, next) => {
  try {
    let chartData = {
      postsData: {},
      likes: {},
    };
    //일일 포스트 수
    const [posts, metadata] = await sequelize.query(
      `SELECT distinct count(id) as count, date(createdAt) as date from posts where UserId=${req.body.userId} group by date(createdAt)`
    );

    //일일 좋아요 받은 수
    const [likes, metadata1] = await sequelize.query(
      `SELECT distinct sum(posts.like) as count, date(createdAt) as date from posts where UserId=${req.body.userId} group by date(createdAt)`
    );

    chartData.postsData = posts;
    chartData.likesData = likes;

    res.status(200).json(chartData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/loadPostPage/:postId", async (req, res, next) => {
  try {
    const post = await Post.findAll({
      where: { id: req.params.postId },
      order: [["id", "DESC"]],
      attributes: { exclude: ["updatedAt", "deletedAt"] },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          // where: { disabled: false },
          include: [
            {
              model: ProfileImgSrc,
              attributes: ["src"],
            },
          ],
        },
        {
          model: Like,
          attributes: ["id", "LikeUserId", "PostId"],
        },
        {
          model: PostImgSrc,
          attributes: ["src"],
        },
        {
          model: PostVideoSrc,
          attributes: ["src"],
        },
        {
          model: Report,
        },
        {
          model: Bookmark,
          attributes: ["UserId", "PostId"],
        },
      ],
    });

    res.status(200).json(post[0]);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
