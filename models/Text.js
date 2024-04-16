const mongoose = require("mongoose");
const { Schema } = mongoose;

const TextSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Text", TextSchema);
