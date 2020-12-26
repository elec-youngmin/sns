const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: "zTeA5fJdImwk2JM4onQU",
        clientSecret: "asdfasdf",
        callbackURL: "user/naver/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne(
          {
            id: profile.id,
          },
          function (err, user) {
            if (!user) {
              user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.displayName,
                provider: "naver",
                naver: profile._json,
              });
              user.save(function (err) {
                if (err) console.log(err);
                return done(err, user);
              });
            } else {
              return done(err, user);
            }
          }
        );
      }
    )
  );
};
