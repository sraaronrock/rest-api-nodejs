"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  author: String,
  editorial: String,
  year: Number,
  generos: String,
  image: String,
});

module.exports = mongoose.model("Project", ProjectSchema);
