const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'users',
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