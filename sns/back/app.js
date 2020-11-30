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
const hpp = require("hpp");
const helmet = require("helmet");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

dotenv.config();
const app = express();
db.sequelize
  .sync({ alter: false }) //테이블을 수정하고 싶으면 true로 변경
  .then(() => {
    console.log("데이터베이스 연결 성공!");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("combined"));
app.use(hpp());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://3.34.241.174",
      "http://interfree.co.kr",
    ],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "secret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(80, () => {
  console.log("서버 실행중");
});
