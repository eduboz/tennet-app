const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const User = require("../models/user.model");

const authController = require("../controllers/auth.controller");

router.get("/login", authController.oneLogin);
router.post("/login", authController.login);

module.exports = router;
