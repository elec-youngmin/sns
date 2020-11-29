const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Follow extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        timestamps: false,
        modelName: "Follow",
        tableName: "follows",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Follow.belongsTo(db.User, {
      foreignKey: "followerId",
      targetKey: "id",
    });
    //  외래키는 user.id, user.id가 follow.followingId로 들어감.
    db.Follow.belongsTo(db.Post, {
      foreignKey: "followingId",
      targetKey: "UserId",
    });
    //
  }
};
