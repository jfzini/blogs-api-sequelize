const CategoryModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Category',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
