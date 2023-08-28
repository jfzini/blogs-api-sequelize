const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  /**
   * @param {import('sequelize').Sequelize} sequelize
   * @param {import('sequelize').DataTypes} DataTypes
   * */
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      underscored: true,
    },
  );

  User.associate = ({ BlogPost }) => {
    User.hasMany(BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return User;
};
