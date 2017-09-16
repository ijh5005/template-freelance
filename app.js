const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      config = require("./config"),
      setupController = require("./controllers/setupController"),
      auth = require("./controllers/auth"),
      bodyParser = require("body-parser"),
      session = require("express-session"),
      port = process.env.PORT || 3000;

app.use("/", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "cyjcvkrtpojigkuvbk", resave:false, saveUninitialized:true}));

mongoose.connect(config.getDbConnectionString());

//setup routes
setupController(app);
auth(app);

app.listen(port);
