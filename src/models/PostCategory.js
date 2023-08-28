const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {}

  /**
   * @param {import('sequelize').Sequelize} sequelize
   * @param {import('sequelize').DataTypes} DataTypes
   * */
  PostCategory.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'PostCategory',
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    },
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });

    Category.belongsToMany(BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPosts',
    });
  };

  return PostCategory;
};
