const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends (
  Model
) {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        introduce: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        ShareLink: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        where: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        disabled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        snsId: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
      },
      {
        indexes: [{ unique: true, fields: ["email"] }],
        modelName: "User",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.ProfileImgSrc);

    db.User.hasMany(db.Follow, { foreignKey: "followerId", sourceKey: "id" });
    db.User.hasMany(db.TimelineSub, { foreignKey: "userId", sourceKey: "id" });

    db.User.hasMany(db.Bookmark);

    // db.User.belongsToMany(db.User, {
    //   foreignKey: "followingId",
    //   as: "Followers",
    //   through: "Follow",
    // });
    // db.User.belongsToMany(db.User, {
    //   foreignKey: "followerId",
    //   as: "Followings",
    //   through: "Follow",
    // });
  }
};
