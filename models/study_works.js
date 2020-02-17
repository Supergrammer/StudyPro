/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('study_works', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    writer: {
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'study_works'
  });
};
