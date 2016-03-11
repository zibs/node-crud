var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String }
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
// mongodb cna use  single document with embeded obejcts
// define our mongodb *schema*, methods, callbacks, associates, then this will create model object/class. A function that behaves like a class. Define a schema first, and then call methods on it. Scheme defines structure
