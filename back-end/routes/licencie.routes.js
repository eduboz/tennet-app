module.exports = (app) => {
  //var router = require("express").Router();

  const licencie = require("../controllers/licencie.controller.js");

  // Retrieve all licencie
  app.get("/licencie", licencie.findAll);

  // Retrieve a single licencie with licencieId
  app.get("/licencie/:id", licencie.findOne);
};
