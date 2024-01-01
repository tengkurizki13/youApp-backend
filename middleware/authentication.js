const { decodedJson } = require("../helpers/webToken");
const { Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.access_token) throw { name: "authentication" };
    let decoded = decodedJson(req.headers.access_token);
    let customer = await Customer.findByPk(decoded.id);
    if (!customer) throw { name: "authentication" };
    req.customer = {
      id: customer.id,
      role: customer.role,
      email: customer.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
