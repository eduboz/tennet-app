module.exports = (app) => {
  const equipement = require("../controllers/equipement.controller.js");

  app.get("/equipement", equipement.findAll);

  app.get("/equipement/:id", equipement.findOne);

  app.put("/equipement/:id", equipement.putGrocery);
};
