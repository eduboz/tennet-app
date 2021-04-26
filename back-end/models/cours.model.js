const sql = require("./db.js");

// Constructeur
const Cours = function (cours) {
  this.id = cours.id;
  this.cours_heure = cours.cours_heure;
  this.cours_jour = cours.cours_jour;
  this.licencie_niv = cours.licencie_niv;
  this.personnel_id = cours.personnel_id;
  this.licencie_id = cours.licencie_id;
};

Cours.getAll = (result) => {
  sql.query("SELECT * FROM cours", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Cours : ", res);
    result(null, res);
  });
};

Cours.findById = (id, result) => {
  sql.query(
    `SELECT personnel.id, personnel_nom, personnel_prenom, cours_id, cours_heure, cours_jours, personnel_id, licencie_niv, licencie_nom, licencie_prenom FROM personnel INNER JOIN cours ON personnel.id = cours.personnel_id INNER JOIN licencie ON cours.licencie_niv = licencie.licencie_niveau WHERE cours.cours_id=${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found : ", res);
        result(null, res);
        return;
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Cours;
