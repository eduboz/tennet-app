const Equipement = require("../models/equipement.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Equipement.getAll((err, data) => {
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
  const id = req.params.id;
  Equipement.findById(req.params.id, (err, data) => {
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

exports.putGrocery = (req, res) => {
  const id = req.params.id;
  const item = req.body;
  Equipement.update(id, item, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(200).send({
          message: `Not found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating with id " + req.params.id,
        });
      }
    } else res.send(data);
    console.log(req.body.materiel_quantite);
  });
};

exports.update = async (req, res, next) => {
  try {
    const putResponse = await Equipement.update(
      req.body.id,
      req.body.materiel_quantite
    );
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
