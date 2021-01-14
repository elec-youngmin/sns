const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const nodemailer = require("nodemailer");
const { User, Post, ProfileImgSrc, sequelize } = require("../models");
const { conformLogin, conformNotLogin } = require("./cofirmLogin");

const router = express.Router();

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  resion: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "interfree-s3",
    acl: "public-read",
    key(req, file, cb) {
      console.log(file);
      cb(
        null,
        `profile/${Date.now()}_${path.basename(
          decodeURIComponent(file.originalname)
        )}`
      );
    },
  }),
  limits: { fileSize: 2000 * 1024 * 1024 }, //200메가까지 업로드 할 수 있음.
});

router.post("/signUp", conformNotLogin, async (req, res, next) => {
  const { email, password, nickname } = req.body;
  try {
    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) {
      next("이미 존재하는 이메일입니다. 다른 이메일을 사용해 주세요.");
    }
    const encryptionPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: encryptionPassword,
      nickname,
    });
    return res.json("회원가입 성공");
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(500).json(info.message);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userInformation = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "updatedAt"],
        },
        include: [
          {
            model: ProfileImgSrc,
            attributes: ["src"],
          },
        ],
      });

      return res.status(200).json(userInformation);
    });
  })(req, res, next);
});

router.get("/auth/kakaoLogin", passport.authenticate("kakao"));

router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/kakaoError",
  }),
  (req, res) => {
    res.redirect("http://interfree.co.kr");
  }
);

router.get("/kakaoError", async (req, res, next) => {
  try {
    res.json("에러가 발생했습니다.");
  } catch (err) {
    next(err);
    console.error(err);
  }
});

router.post("/loadUserInfomation", async (req, res, next) => {
  try {
    const userInfomation = await User.findOne({
      where: { id: req.user.dataValues.id },
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      include: [
        {
          model: ProfileImgSrc,
          attributes: ["src"],
        },
      ],
    });

    const [postsCount, postsCountMetadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.user.dataValues.id}`
    );

    const [followCount, followCountMetadata] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.user.dataValues.id}`
    );

    const [followingCount, followingCountMetadata] = await sequelize.query(
      `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${req.user.dataValues.id}`
    );

    userInfomation.dataValues.postsCount = postsCount[0].postsCount;
    userInfomation.dataValues.followCount = followCount[0].followCount;
    userInfomation.dataValues.followingCount = followingCount[0].followingCount;

    return res.json(userInfomation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/confirmCurrentLogin", async (req, res, next) => {
  try {
    if (req.user) {
      const currentLogin = {
        id: req.user.dataValues.id,
      };
      return res.status(200).json(currentLogin);
    } else {
      const currentLogin = {
        id: "guest",
      };
      return res.status(200).json(currentLogin);
    }
  } catch (err) {
    next(err);
    console.error(err);
  }
});

router.post("/destroyUser", conformLogin, async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.user.dataValues.password
    );
    if (result) {
      await Post.destroy({
        where: { UserId: req.user.dataValues.id },
        force: true,
      });
      await User.destroy({
        where: { id: req.user.dataValues.id },
      });
      req.logout();
      req.session.destroy();
    } else {
      return res.status(500).json("비밀번호가 일치하지 않습니다.");
    }
    res.status(200).json("회원탈퇴가 완료되었습니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// id,
// nicknameValue,
// introduceValue,
// shereLinkValue,
// whereValue,
router.patch("/changeProfile", conformLogin, async (req, res, next) => {
  try {
    if (req.body.nicknameValue) {
      await User.update(
        { nickname: req.body.nicknameValue },
        { where: { id: req.user.dataValues.id } }
      );
    }
    if (req.body.introduceValue) {
      await User.update(
        { introduce: req.body.introduceValue },
        { where: { id: req.user.dataValues.id } }
      );
    }
    if (req.body.shereLinkValue) {
      await User.update(
        { ShareLink: req.body.shereLinkValue },
        { where: { id: req.user.dataValues.id } }
      );
    }
    if (req.body.whereValue) {
      await User.update(
        { where: req.body.whereValue },
        { where: { id: req.user.dataValues.id } }
      );
    }
    const userInfomation = await User.findOne({
      where: { id: req.user.dataValues.id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: ProfileImgSrc,
          attributes: ["src"],
        },
      ],
    });

    const [postsCount, postsCountMetadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.user.dataValues.id}`
    );

    const [followCount, followCountMetadata] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.user.dataValues.id}`
    );

    const [followingCount, followingCountMetadata] = await sequelize.query(
      `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${req.user.dataValues.id}`
    );

    userInfomation.dataValues.postsCount = postsCount[0].postsCount;
    userInfomation.dataValues.followCount = followCount[0].followCount;
    userInfomation.dataValues.followingCount = followingCount[0].followingCount;

    res.status(200).json(userInfomation);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/logout", (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.json("로그아웃 성공");
  } catch (err) {
    next(err);
    console.error(err);
  }
});

router.post(
  "/profileImage",
  conformLogin,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const result = await ProfileImgSrc.findAll({
        where: { UserId: req.user.dataValues.id },
      });
      if (result) {
        await ProfileImgSrc.destroy({
          where: { UserId: req.user.dataValues.id },
        });
      }
      await ProfileImgSrc.create({
        UserId: req.user.dataValues.id,
        src: req.file.location,
      });
      console.log(
        req.file.location,
        req.user.dataValues.id,
        "번 유저 파일이 업로드 됨"
      );
      const userInfomation = await User.findOne({
        where: { id: req.body.userId },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProfileImgSrc,
            attributes: ["src"],
          },
        ],
      });

      res.json(userInfomation);
    } catch (err) {
      console.error(err);
    }
  }
);

router.post("/resettingPassword", conformLogin, async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.user.dataValues.password
    );

    if (!result) {
      return res.status(500).json("현재 비밀번호가 일치하지 않아요.");
    }

    const setHashPassowrd = await bcrypt.hash(req.body.rePassword, 12);

    await User.update(
      { password: setHashPassowrd },
      { where: { id: req.user.dataValues.id } }
    );

    res.status(200).json("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/findPassword", async (req, res, next) => {
  try {
    const result = await User.findOne({ where: { email: req.body.email } });

    if (!result) {
      return res.status(500).json("해당 이메일로 가입되어 있지 않아요.");
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // gmail 계정 아이디
        pass: process.env.MAIL_PASS, // gmail 계정 비밀번호
      },
    });

    const randomString = Math.random().toString(36).substring(2);

    const encryptionPassword = await bcrypt.hash(randomString, 12);
    await User.update(
      { password: encryptionPassword },
      // 사용자가 설정한 패스워드로 재설정
      { where: { email: req.body.email } }
    );

    let mailOptions = {
      from: process.env.MAIL_USER,
      to: req.body.email, // 수신 메일 주소
      subject: "interfree에서 임시 비밀번호를 보냈습니다.",
      html: `<h1>임시 비밀번호가 발급되었습니다.</h1> 
        <h1>임시 비밀번호: ${randomString}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json("에러발생");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json(req.body.email);
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/disabledOneUserAllpost", conformLogin, async (req, res, next) => {
  try {
    await User.update(
      { disabled: true },
      {
        where: {
          id: req.user.dataValues.id,
        },
      }
    );
    res.status(200).json("모든 글이 비활성화 됨");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/activateOneUserAllpost", conformLogin, async (req, res, next) => {
  try {
    await User.update(
      { disabled: false },
      {
        where: {
          id: req.user.dataValues.id,
        },
      }
    );
    res.status(200).json("모든 글이 다시 활성화 됨");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
