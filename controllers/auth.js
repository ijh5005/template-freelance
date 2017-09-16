const User = require("../models/models"),
      path = require("path"),
      express = require("express"),
      bodyParser = require("body-parser");

module.exports = (app) => {

  //authenticate a user
  app.post("/login", (req, res) => {
    const username = req.body.username,
          password = req.body.password;

    //find the user
    User.findOne({username: username}, (err, user) => {
      if(err){
        console.log(err);
        return res.status(500).send();
      }

      //if the user isn't found
      if(!user){
        return res.status(404).send();
      }

      // test a failing password
      user.comparePassword(password, function(err, isMatch) {
          if (err) throw err;
          if(isMatch && isMatch == true){
            req.session.user = user;
            //if the user if found
            return res.status(200).send();
          } else {
            return res.status(401).send();
          }
      });

    })
  });

  app.get("/homepage", (req, res, next) => {
    //check to see if we are logged in
    if(!req.session.user){
      return res.status(401).send();
    }

    next();
    //return res.status(200).send("welcome to the MY homepage! :)");
    //cres.sendFile(__dirname + "/home");
  });

  app.use("/homepage", express.static(__dirname + "/home"));


  app.get("/logout", (req, res, next) => {
    req.session.destroy();
    //res.status(200).send();
    next();
  });

  app.use("/logout", express.static(__dirname + "/logout"));

  //register a user
  app.post("/register", (req, res) => {
    //console.log(req.body);
    //cache the schema info
    const username = req.body.username,
          password = req.body.password,
          firstname = req.body.firstname,
          lastname = req.body.lastname;

    //create a new user
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    //save the user
    newUser.save((err, savedUser) => {
      if(err){
        console.log(err);
        return res.status(500).send();
      }

      return res.status(200).send();
    });
  });
}
