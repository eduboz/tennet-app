const sql = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = function (admin) {
  this.admin_id = admin.admin_id;
  this.admin_login = admin.admin_login;
  this.admin_mail = admin.admin_mail;
  this.admin_mdp = admin.admin_mdp;
};

User.findById = (admin_mail, admin_mdp, result) => {
  console.log("Model");
  console.log(admin_mail, admin_mdp);

  sql.query(
    `SELECT * FROM admin WHERE admin_mail = '${admin_mail}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        console.log("comparaison", admin_mdp, res[0].admin_mdp);

        if (admin_mdp === res[0].admin_mdp) {
          console.log("Admin : ", res);
          result(null, res);
          return;
        }
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

User.findOne = (admin_mail, admin_mdp, result) => {
  console.log("Model");
  console.log(admin_mail, admin_mdp);

  sql.query(
    `SELECT * FROM admin WHERE admin_mail = '${admin_mail}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length > 0) {
        if (admin_mdp === res[0].admin_mdp) {
          console.log("Admin : ", res);
          result(null, res);
          return;
        }
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
