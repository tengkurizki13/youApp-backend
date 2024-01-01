const { Cuisine } = require("../models");

const authorizetionForAdmin = async (req, res, next) => {
  try {
    let cuisine = await Cuisine.findByPk(req.params.id);
    if (!cuisine) throw { name: "notFound" };
    if (req.author.role !== "Admin") throw { name: "forbidden" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizetionForAdmin;
