const Sequelize = require("sequelize");

module.exports = class ProfileImgSrc extends Sequelize.Model {
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
        timestamps: false,
        modelName: "ProfileImgSrc",
        tableName: "profileImgSrcs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.ProfileImgSrc.belongsTo(db.User);
  }
};
