const sql = require("./db.js");

// Constructor
const Equipement = function (equipement) {
  this.id = equipement.id;
  this.materiel_type = equipement.materiel_type;
  this.materiel_quantite = equipement.materiel_quantite;
};

Equipement.update = (id, item, result) => {
  let data = [item.id, item.materiel_quantite, item.materiel_type];
  sql.query(
    "UPDATE materiel SET materiel_quantite=? WHERE id = ?",
    [item.materiel_quantite, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Equipement.getAll = (result) => {
  sql.query("SELECT * FROM materiel", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Equipement(s): ", res);
    result(null, res);
  });
};

Equipement.findById = (id, result) => {
  sql.query(`SELECT * FROM materiel WHERE id = ${id}`, (err, res) => {
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
  });
};

Equipement.deleteById = (id, equipement, result) => {
  sql.query(
    "UPDATE materiel SET materiel_quantite = (materiel_quantite-1) WHERE id = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated equipement: ", {
        id: equipement.materiel_quantite,
        ...equipement.materiel_quantite,
      });
      result(null, { id: id, ...equipement });
    }
  );
};

module.exports = Equipement;
