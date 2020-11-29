const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Like extends Model {
  static init(sequelize) {
    return super.init(
      {
        LikeUserId: {
          type: DataTypes.INTEGER(4),
          allowNull: false,
        },
      },
      {
        modelName: "Like",
        tableName: "Likes",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Post);
  }
};
