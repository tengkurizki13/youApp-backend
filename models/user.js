'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email must be unique",
      },
      validate: {
        notEmpty: {
          msg: "email is required",
        },
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          msg: "format email is wrong",
        },
      },
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required",
        },
        notEmpty: {
          msg: "password is required",
        },
        min: {
          args: 5,
          msg: "Minimum password length is 5 word",
        },
      },
    },
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    height: DataTypes.NUMBER,
    weight: DataTypes.NUMBER,
    interests: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });

  // Menyembunyikan kolom password dari hasil query
  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };
  return User;
};