const sql = require("./db.js");

// Constructor
const Personnel = function (personnel) {
  this.id = personnel.id;
  this.personnel_nom = personnel.personnel_nom;
  this.personnel_prenom = personnel.personnel_prenom;
  this.personnel_info = personnel.personnel_info;
  this.personnel_age = personnel.personnel_age;
};

Personnel.getAll = (result) => {
  sql.query("SELECT * FROM personnel", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Personnel(s): ", res);
    result(null, res);
  });
};

Personnel.findById = (id, result) => {
  sql.query(`SELECT * FROM personnel WHERE id = ${id}`, (err, res) => {
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
    // not found  with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Personnel;
