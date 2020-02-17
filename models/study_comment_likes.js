/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('study_comment_likes', {
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
        model: 'study_comments',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'study_comment_likes'
  });
};
