var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    author: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      unique: true
    },
    image: {
      type: String,
      unique: true
    },
    link : {
      type: String,
      unique: true
    }
  });

var Book = mongoose.model("Book", BookSchema);

module.exports = Book;