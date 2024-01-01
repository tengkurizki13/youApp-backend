const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/api/createProfile", UserController.createProfile);
router.get("/api/getProfile", UserController.getProfile);
router.put("/api/updateProfile", UserController.updateProfile);
module.exports = router;
