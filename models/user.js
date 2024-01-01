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
        msg: "Email Must Be Unique",
      },
      validate: {
        notEmpty: {
          msg: "Email Is Required",
        },
        notNull: {
          msg: "Email Is Required",
        },
        isEmail: {
          msg: "Format Email Is Wrong",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username Is Required",
        },
        notEmpty: {
          msg: "Username Is Required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password Is Required",
        },
        notEmpty: {
          msg: "Password Is Required",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name Is Required",
        },
        notEmpty: {
          msg: "Name Is Required",
        },
      },
    },
    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Birthday Is Required",
        },
        notEmpty: {
          msg: "Birthday Is Required",
        },
      },
    },
    height: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Height Is Required",
        },
        notEmpty: {
          msg: "Height Is Required",
        },
      },
    },
    weight: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Weight Is Required",
        },
        notEmpty: {
          msg: "Weight Is Required",
        },
      },
    },
    interests: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Interests Is Required",
        },
        notEmpty: {
          msg: "Interests Is Required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });


  User.afterCreate((user, option) => {
    // user.password = hashPassword(user.password);
    delete user.password
    console.log(user.password,"after");
  });
  return User;
};