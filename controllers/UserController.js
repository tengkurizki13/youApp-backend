const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      console.log(username, email, password);
      let createAuthor = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json([
        {
          massage: "User has been created successfully",
          data: createAuthor,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password,username } = req.body;
      if (!email || !password || !username) throw { name: "Bad Request" };
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

module.exports = UserController;
