const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Bookmark extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        modelName: "Bookmark",
        tableName: "bookmarks",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Bookmark.belongsTo(db.User);
    db.Bookmark.belongsTo(db.Post);
  }
};
