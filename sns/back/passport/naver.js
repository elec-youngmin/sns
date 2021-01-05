const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: "zTeA5fJdImwk2JM4onQU",
        clientSecret: "Tqh_UCuGzL",
        callbackURL: "user/naver/callback",
      },
      () => {}
      // async (accessToken, refreshToken, profile, done) => {
      //   console.log("kakao profile", profile);
      //   try {
      //     const exUser = await User.findOne({
      //       where: { snsId: profile.id },
      //     });
      //     if (exUser) {
      //       done(null, exUser);
      //     } else {
      //       const newUser = await User.create({
      //         email: profile.emails[0].value,
      //         nickname: profile.displayName,
      //         snsId: profile.id,
      //       });
      //       done(null, newUser);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //     done(error);
      //   }
      // }
    )
  );
};
