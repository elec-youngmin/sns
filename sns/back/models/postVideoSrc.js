const Sequelize = require("sequelize");

module.exports = class PostVideoSrc extends Sequelize.Model {
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
        modelName: "PostVideoSrc",
        tableName: "postVideoSrc",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.PostVideoSrc.belongsTo(db.Post);
  }
};
