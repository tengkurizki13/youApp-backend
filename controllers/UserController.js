const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class UserController {
  static async createProfile(req, res, next) {
    try {
      const { name = "", birthday = "", height = null,weight = null,interests = [] } = req.body;
      let option = {
        where: { email:req.user.email },
      };
      await User.update(
        {
          name,
          birthday,
          height,
          weight,
          interests,
        },
        option
      );
      res.status(201).json([
        {
          message: "Profile has been created",
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      let option = {
          attributes: {
            exclude: ["password"],
          },
      };
      let user = await User.findByPk(req.user.id, option);

      res.status(200).json([
        {
          message: "Profile has been found",
          data: user,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { name = null, birthday = null, height = null,weight = null,interests = null } = req.body;
      let option = {
        where: { email:req.user.email },
      };
      await User.update(
        {
          name,
          birthday,
          height,
          weight,
          interests,
        },
        option
      );
      res.status(201).json([
        {
          message: "Profile has been updated",
        },
      ]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
