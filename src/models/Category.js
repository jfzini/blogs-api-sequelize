const CategoryModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'categories',
      underscored: true,
    },
  );
  return Product;
};

module.exports = CategoryModel;
