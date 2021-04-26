const Cours = require("../models/cours.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Cours.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Cours.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
          message: `Not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
