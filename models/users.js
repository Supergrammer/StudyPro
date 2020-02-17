/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    platform_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    auth: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    profile_url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    about: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
