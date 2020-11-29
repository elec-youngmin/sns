const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //유저정보중에서 쿠키랑 묶어줄 id만 저장한다.
  });
  //req.login의 user가 콜백함수의 인자로 들어감.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); //세선에 저장한 id를 통해서 user를 복구함.
    } catch (error) {
      console.error(error);
      done(error); //패스포트는 done으로
    }
  });

  local();
};
