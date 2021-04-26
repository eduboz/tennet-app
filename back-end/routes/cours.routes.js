module.exports = (app) => {
  const cours = require("../controllers/cours.controller.js");

  // Retrieve all course
  app.get("/cours", cours.findAll);

  // Retrieve a single Customer with courseId
  app.get("/cours/:id", cours.findOne);
};
