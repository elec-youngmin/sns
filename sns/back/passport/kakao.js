const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

console.log("출력됨.....................");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: "931e2fbebef3a62e84fd83d19f151955",
        callbackURL: "/user/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
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
