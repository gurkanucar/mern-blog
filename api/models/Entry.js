const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const slugify = require("slugify");

const EntrySchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  slug: { type: String, unique: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

EntrySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const EntryModel = model("Entry", EntrySchema);

module.exports = EntryModel;
