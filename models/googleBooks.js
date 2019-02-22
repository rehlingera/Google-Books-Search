const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBooksSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  image: String,
  link: String,
  read: String
});

const googleBooks = mongoose.model("googleBooks", googleBooksSchema);

module.exports = googleBooks;