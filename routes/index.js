const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use(authRoutes);
router.use(authentication);
router.use(userRoutes);

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((e) => {
        return e.message;
      });
      break;
    case "Bad Request":
      status = 400;
      message = "email / password is required";
      break;
    case "authentication":
      console.log("masuk codoe");
      status = 401;
      message = "you are not authentication";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "forbidden":
      status = 403;
      message = "forbidden";
      break;
    case "notFound":
      status = 404;
      message = "data is not found";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
};
router.use(errorHandler);

module.exports = router;
