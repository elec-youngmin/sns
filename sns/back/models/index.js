const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const comment = require("./comment");
const report = require("./report");
const bookmark = require("./bookmark");
const follow = require("./follow");
const like = require("./like");
const postImgSrc = require("./postImgSrc");
const profileImgSrc = require("./profileImgSrc");
const postVideoSrc = require("./postVideoSrc");
const hashtag = require("./hashtag");
const timelineSub = require("./timelineSub");
const timelineContent = require("./timelineContent");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    dialectOptions: {
      multipleStatements: true,
    },
  }
);

db.User = user;
db.Post = post;
db.Comment = comment;
db.Report = report;
db.Bookmark = bookmark;
db.Follow = follow;
db.Like = like;
db.PostImgSrc = postImgSrc;
db.ProfileImgSrc = profileImgSrc;
db.PostVideoSrc = postVideoSrc;
db.Hashtag = hashtag;
db.TimelineSub = timelineSub;
db.TimelineContent = timelineContent;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
