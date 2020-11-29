const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Report extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER(4),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "Report",
        tableName: "reports",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Report.belongsTo(db.User, {
      foreignKey: "postId",
      targetKey: "id",
    });
  }
};
