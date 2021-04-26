const sql = require("./db.js");

// Constructor
const Licencie = function (licencie) {
  this.id = licencie.id;
  this.licencie_prenom = licencie.licencie_prenom;
  this.licencie_nom = licencie.licencie_nom;
  this.licencie_niveau = licencie.licencie_niveau;
};

Licencie.getAll = (result) => {
  sql.query("SELECT * FROM licencie", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Licencie(s): ", res);
    result(null, res);
  });
};

Licencie.findById = (id, result) => {
  sql.query(`SELECT * FROM licencie WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found customer: ", res);
      result(null, res);
      return;
    }
    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Licencie;
