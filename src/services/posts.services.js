const { BlogPost, PostCategory, sequelize } = require('../models');

const createPost = async (post, categories) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(
        { ...post, categories },
        { transaction: t },
      );
      await PostCategory.bulkCreate(
        categories.map((categoryId) => ({ postId: newPost.id, categoryId })),
        { transaction: t },
      );
      return newPost;
    });
    return { status: 'CREATED', data: result };
  } catch (error) {
    console.error(error);
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Something went wrong' } };
  }
};

module.exports = {
  createPost,
};
