/*module.exports = (app) => {
  const licencie = require("../controllers/licencie.js");

  // Create a new Customer
  app.post("/licencie", licencie.create);

  // Retrieve all licencie
  app.get("/licencie", licencie.findAll);

  // Retrieve a single Customer with customerId
  app.get("/licencie/:id", licencie.findOne);

  // Update a Customer with customerId
  app.put("/licencie/:id", licencie.update);

  // Delete a Customer with customerId
  app.delete("/licencie/:id", licencie.delete);

  // Create a new Customer
  app.delete("/licencie", licencie.deleteAll);
};*/

module.exports = (app) => {
  const personnel = require("../controllers/personnel.controller.js");

  // Retrieve all perso
  app.get("/personnel", personnel.findAll);

  // Retrieve a single perso with persoId
  app.get("/personnel/:id", personnel.findOne);
};
