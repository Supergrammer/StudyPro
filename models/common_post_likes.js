/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('common_post_likes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    common_post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'common_posts',
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
    tableName: 'common_post_likes'
  });
};
