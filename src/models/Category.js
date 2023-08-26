/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define(
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
      timestamps: false,
      underscored: true,
    },
  );
  return Category;
};

module.exports = CategoryModel;
