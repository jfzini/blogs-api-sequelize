const { validateToken } = require('../auth/token.jwt');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const createPost = async (post, categories) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create({ ...post, categories }, { transaction: t });
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

const findAllPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCESSFUL', data: result };
};

const findPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCESSFUL', data: result };
};

const updatePost = async (id, { title, content }, token) => {
  const decoded = validateToken(token);
  const originalPost = await findPostById(id);
  if (originalPost.data.user.id !== decoded.id) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  const updateData = { title, content, updated: new Date() };
  await BlogPost.update(updateData, { where: { id } });
  const updatedPost = await findPostById(id);
  return { status: 'SUCESSFUL', data: updatedPost.data };
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  updatePost,
};
