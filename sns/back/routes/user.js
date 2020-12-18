const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const {
  User,
  Post,
  Follow,
  ProfileImgSrc,
  sequelize,
  Sequelize,
} = require("../models");

const router = express.Router();

router.post("/signUp", async (req, res, next) => {
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

      const [postsCount, metadata] = await sequelize.query(
        `SELECT count(id) as postsCount FROM posts where UserId=${user.id}`
      );

      const [followCount, metadata1] = await sequelize.query(
        `SELECT count(followerId) as followCount FROM follows where followerId=${user.id}`
      );

      const [followingCount, metadata2] = await sequelize.query(
        `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${user.id}`
      );

      userInformation.dataValues.postsCount = postsCount[0].postsCount;
      userInformation.dataValues.followCount = followCount[0].followCount;
      userInformation.dataValues.followingCount =
        followingCount[0].followingCount;

      return res.json(userInformation);
    });
  })(req, res, next);
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.post("/loadUserInfomation", async (req, res, next) => {
  try {
    // console.log(req.user.dataValues.id);
    console.log(req.user);
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

    const [postsCount, metadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.user.dataValues.id}`
    );

    const [followCount, metadata1] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.user.dataValues.id}`
    );

    const [followingCount, metadata2] = await sequelize.query(
      `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${req.user.dataValues.id}`
    );

    userInfomation.dataValues.postsCount = postsCount[0].postsCount;
    userInfomation.dataValues.followCount = followCount[0].followCount;
    userInfomation.dataValues.followingCount = followingCount[0].followingCount;

    return res.json(userInfomation);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/destroyUser", async (req, res, next) => {
  try {
    console.log(req.user);
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
        where: { email: req.user.dataValues.email },
      });
      req.logout();
      req.session.destroy();
    } else {
      res.status(500).json("비밀번호가 일치하지 않습니다.");
    }
    res.status(200).json("회원탈퇴가 완료되었습니다.");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// id,
// nicknameValue,
// introduceValue,
// shereLinkValue,
// whereValue,
router.patch("/changeProfile", async (req, res, next) => {
  try {
    if (req.body.nicknameValue) {
      await User.update(
        { nickname: req.body.nicknameValue },
        { where: { id: req.body.id } }
      );
    }
    if (req.body.introduceValue) {
      await User.update(
        { introduce: req.body.introduceValue },
        { where: { id: req.body.id } }
      );
    }
    if (req.body.shereLinkValue) {
      await User.update(
        { ShareLink: req.body.shereLinkValue },
        { where: { id: req.body.id } }
      );
    }
    if (req.body.whereValue) {
      await User.update(
        { where: req.body.whereValue },
        { where: { id: req.body.id } }
      );
    }
    const userInfomation = await User.findOne({
      where: { id: req.body.id },
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

    const [postsCount, metadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.user.dataValues.id}`
    );

    const [followCount, metadata1] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.user.dataValues.id}`
    );

    const [followingCount, metadata2] = await sequelize.query(
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
  req.logout();
  req.session.destroy();
  res.json("로그아웃 성공");
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5000 * 1024 * 1024 },
});

router.post("/profileImage", upload.array("image"), async (req, res, next) => {
  try {
    const result = await ProfileImgSrc.findAll({
      where: { UserId: req.body.userId },
    });
    if (result) {
      await ProfileImgSrc.destroy({
        where: { UserId: req.body.userId },
      });
    }
    await ProfileImgSrc.create({
      UserId: req.body.userId,
      src: req.files[0].filename,
    });
    console.log(
      req.files[0].filename,
      req.body.userId,
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

    const [postsCount, metadata] = await sequelize.query(
      `SELECT count(id) as postsCount FROM posts where UserId=${req.user.dataValues.id}`
    );

    const [followCount, metadata1] = await sequelize.query(
      `SELECT count(followerId) as followCount FROM follows where followerId=${req.user.dataValues.id}`
    );

    const [followingCount, metadata2] = await sequelize.query(
      `SELECT count(follows.followingId) AS followingCount FROM follows where follows.followingId=${req.user.dataValues.id}`
    );

    userInfomation.dataValues.postsCount = postsCount[0].postsCount;
    userInfomation.dataValues.followCount = followCount[0].followCount;
    userInfomation.dataValues.followingCount = followingCount[0].followingCount;

    res.json(userInfomation);
  } catch (err) {
    console.error(err);
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
        user: "mintzerocode@gmail.com", // gmail 계정 아이디를 입력
        pass: process.env.MAIL_PASS, // gmail 계정의 비밀번호를 입력
      },
    });

    const toekn = jwt.sign(
      {
        sub: "sjk5766",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
        issuer: "interfree",
      }
    );
    global.toekn = toekn;
    global.user = req.body.email;
    let mailOptions = {
      from: process.env.MAIL_USER, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: req.body.email, // 수신 메일 주소
      subject: "interfree에서 인증메일을 보냈습니다.", // 제목
      html: `<a href='http://localhost:3000/FindPassword/
      ${toekn}'>인증하기</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json(req.body.email);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//req.body.followId, req.body.followingId
router.post("/followUser", async (req, res, next) => {
  try {
    // const result = await Follow.findOne({
    //   where: {
    //     followerId: req.body.followerId,
    //     followingId: req.body.followingId,
    //   },
    // });
    // if (result) {
    //   res.status(500).json("이미 팔로잉 되어 있습니다.");
    // }
    await Follow.create({
      followerId: req.body.followerId,
      followingId: req.body.followingId,
    });
    const result = await Follow.findAll({
      where: { followerId: req.body.followerId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//req.body.followId, req.body.followingId
router.post("/unFollowUser", async (req, res, next) => {
  try {
    console.log(req.body);
    await Follow.destroy({
      where: {
        followerId: req.body.followerId,
        followingId: req.body.followingId,
      },
    });
    const result = await Follow.findAll({
      where: { followerId: req.body.followerId },
      attributes: ["followingId"],
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/loadFollowingUser", async (req, res, next) => {
  try {
    const result = await Follow.findAll({
      where: { followerId: 1 },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/resettingPassword", async (req, res, next) => {
  console.log(global.user);
  try {
    const encryptionPassword = await bcrypt.hash(req.body.password, 12);
    const result = await User.update(
      { password: encryptionPassword },
      // 사용자가 설정한 패스워드로 재설정
      { where: { email: global.user } }
    );
    res.status(200).json("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//유저의 이메일에서 요청한 경로
router.get("/email/:id", (req, res, next) => {
  try {
    console.log(global.user);
    const id = req.params.id;
    console.log(JSON.stringify(id));
    if (id.trim() == toekn) {
      console.log("토큰이 일치함");
      res.status(200).json("토큰이 일치함 ok");
    } else {
      console.log("토큰이 일치하지 않음");
      res.status(500).json("올바른 요청이 아님");
    }
  } catch (err) {
    console.error(err);
    next("에러발생");
  }
});

router.get("/disabledOneUserAllpost", async (req, res, next) => {
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
    console.log(err);
    next(err);
  }
});

router.get("/activateOneUserAllpost", async (req, res, next) => {
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
    console.log(err);
    next(err);
  }
});

router.use(function (err, req, res, next) {
  res.status(500).send(err);
});

module.exports = router;
