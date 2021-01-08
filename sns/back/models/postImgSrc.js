const Sequelize = require("sequelize");

module.exports = class PostImgSrc extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "PostImgSrc",
        tableName: "postImgSrc",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.PostImgSrc.belongsTo(db.Post);
  }
};
