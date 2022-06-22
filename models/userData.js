const express = require("express");
const mongoose = require("mongoose");

const DataModelSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});
const User = mongoose.model("User", DataModelSchema);
module.exports = User;
