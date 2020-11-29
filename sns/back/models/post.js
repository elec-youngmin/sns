const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        contents: {
          type: DataTypes.STRING(4000),
          allowNull: false,
        },
        like: {
          type: DataTypes.INTEGER(4),
          defaultValue: 0,
        },
        onlyReadMy: {
          type: DataTypes.BOOLEAN(4),
          defaultValue: false,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        paranoid: "true",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.hasMany(db.Bookmark);
    db.Post.hasMany(db.Like);
    db.Post.hasMany(db.PostImgSrc);
    db.Post.hasMany(db.PostVideoSrc);
    db.Post.hasMany(db.Report, {
      foreignKey: "postId",
      sourceKey: "id",
    });
    db.Post.hasMany(db.Follow, {
      foreignKey: "followingId",
      sourceKey: "UserId",
    });
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  }
};
