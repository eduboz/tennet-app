const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.login = (req, res) => {
  console.log(req.body.email, req.body.password);
  User.findById(req.body.email, req.body.password, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

exports.oneLogin = (req, res) => {
  //console.log(req.body.email, req.body.password);
  const admin_mail = req.body.admin_mail;
  const password = req.body.password;

  User.findOne(req.body.email, req.body.password, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};
