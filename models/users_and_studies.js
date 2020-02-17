/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_and_studies', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    study_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'studies',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'users_and_studies'
  });
};
