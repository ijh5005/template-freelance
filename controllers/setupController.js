const template = require("../models/models");

module.exports = (app) => {
  app.get("/api/setup", (req, res) => {
    const starterData = [
      {
        username: "admin",
        password: "webtemplate"
      }
    ];

    template.create(starterData, (err, results) => {
      res.send(results);
    });

  });
}
