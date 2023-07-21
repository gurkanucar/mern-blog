const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  detail: { type: String, required: true },
});

const RoleModel = model("Role", RoleSchema);

module.exports = RoleModel;
