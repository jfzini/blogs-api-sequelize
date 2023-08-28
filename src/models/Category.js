const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  /**
   * @param {import('sequelize').Sequelize} sequelize
   * @param {import('sequelize').DataTypes} DataTypes
   */
  Category.init(
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
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false,
      underscored: true,
    },
  );

  return Category;
};
