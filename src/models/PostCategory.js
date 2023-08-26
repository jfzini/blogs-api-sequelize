/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
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
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPosts',
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
