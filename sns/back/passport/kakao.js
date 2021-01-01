const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: "931e2fbebef3a62e84fd83d19f151955",
        callbackURL: "/user/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            console.log(
              profile._json.kakao_account.email,
              profile.displayName,
              profile.id
            );
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              nickname: profile.displayName,
              snsId: profile.id,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
