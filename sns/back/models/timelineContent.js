const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TimelineContent extends (
  Model
) {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          defaultValue: 0,
        },
        date: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: 0,
        },
        icon: {
          type: DataTypes.STRING(200),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "TimelineContent",
        tableName: "timelineContents",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TimelineContent.belongsTo(db.TimelineSub, {
      foreignKey: "TimelineSubId",
      targetKey: "id",
    });
  }
};
