const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {}

  /**
   * @param {import('sequelize').Sequelize} sequelize
   * @param {import('sequelize').DataTypes} DataTypes
   * */
  BlogPost.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'BlogPost',
      tableName: 'blog_posts',
      timestamps: false,
      underscored: true,
    },
  );

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPost;
};
