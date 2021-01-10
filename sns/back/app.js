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
const FileStore = require("session-file-store")(session);

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

process.env.NODE_ENV === "production" && app.set("trust proxy", 1);

app.use(morgan("combined"));
app.use(hpp());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  cors({
    origin: ["https://interfree.co.kr", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    proxy: process.env.NODE_ENV === "production" ? true : false,
    secret: process.env.SECRET,
    store: new FileStore(),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain: process.env.NODE_ENV === "production" && ".interfree.co.kr",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(process.env.NODE_ENV === "production" ? 3060 : 80, () => {
  console.log("서버 실행중");
});
