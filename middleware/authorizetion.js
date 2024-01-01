const { Cuisine } = require("../models");

const authorizetion = async (req, res, next) => {
  try {
    let cuisine = await Cuisine.findByPk(req.params.id);
    if (!cuisine) throw { name: "notFound" };
    if (req.author.role !== "Admin") {
      if (cuisine.authorId !== req.author.id) throw { name: "forbidden" };
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorizetion;
