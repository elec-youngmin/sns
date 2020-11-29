const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const db = require("./models");
const passportConfig = require("./passport");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

db.sequelize
  .sync({ alter: false }) //테이블을 수정하고 싶으면 true로 변경
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch(console.error);

dotenv.config();
const app = express();
passportConfig();

app.use(morgan("dev"));

app.use("/", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://13.125.208.231"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(80, () => {
  console.log("서버 실행중");
});
