const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TimelineSub extends (
  Model
) {
  static init(sequelize) {
    return super.init(
      {
        subject: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
      },
      {
        modelName: "TimelineSub",
        tableName: "timelineSubs",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TimelineSub.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    db.TimelineSub.hasMany(db.TimelineContent, {
      foreignKey: "TimelineSubId",
      sourceKey: "id",
    });
  }
};
