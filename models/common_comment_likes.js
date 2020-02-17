/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('common_comment_likes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'common_comments',
        key: 'id'
      }
    },
    users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'common_comment_likes'
  });
};
