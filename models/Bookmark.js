const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    road: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Road",
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bookmark", BookSchema);
