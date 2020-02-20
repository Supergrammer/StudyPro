/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('days', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    study_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    tableName: 'days'
  });
};
