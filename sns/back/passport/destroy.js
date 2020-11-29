const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: req.user,
        passwordField: "password",
      },
      async (password, done) => {
        try {
          const result = await bcrypt.compare(password, exUser.password);
          if (result) {
            done(null, result);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
