const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry",
  },
  createdDate: { type: Date, default: Date.now },
});

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
