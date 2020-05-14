"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/portafolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conexión con la base de datos establecida con exito ...");

    app.listen(port, () => {
      console.log("Servidor funcionando");
    });
  })
  .catch((err) => console.log(err));
