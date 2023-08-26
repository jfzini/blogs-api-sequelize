/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
        allowNull:false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return User;
};

module.exports = UserModel;
