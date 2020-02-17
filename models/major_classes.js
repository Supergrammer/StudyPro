/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('major_classes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'major_classes'
  });
};
