const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");
const { STRING } = require("sequelize");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, name = "string" , birthday = "string", height = 0,weight = 0,interests= ["empty"] } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
        name,
        birthday,
        height,
        weight,
        interests
      });
      let option = {
        attributes: {
          exclude: ["password", "name", "birthday", "height","weight","interests"],
        },
    };
      let user = await User.findByPk(newUser.id, option);
      res.status(201).json([
        {
          massage: "User has been created successfully",
          data: user,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password ) throw { name: "Bad Request" };
      let user = await User.findOne({
        where: { email },
      });
      let isValidPassword = comparePassword(password, user.password);
      if (!user || !isValidPassword) throw { name: "authentication" };
      let payload = {
        id: user.id,
      };
      payload = encodedJson(payload);
      res.status(200).json([
        {
          massage: "User has been logged in",
          data : {
            access_token: payload,
            id: user.id,
            email: user.email,
          }
        },
      ]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
