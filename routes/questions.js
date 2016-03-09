var express = require("express");
var router = express.Router();
var Question = require("../models/question");
// creating a route ^^ technically a controller.


// router.get("/index", function())

router.get("/new", function(request, response, next) {
  // response object, can call end on it, we can finish the request and can send something back to the user. End(text) Render(template) Redirect(url).
  // response.end("Create New Question");
  response.render("questions/new", {errors: {}});
});

router.post("/", function(request, response, next){
  var question = new Question({title: request.body.title,
                               body: request.body.body});
  question.save(function(err, question){
    if(err){
      response.render("questions/new", {errors: err.errors});
    } else {
        // response.end(question._id.toString());
        response.redirect("/questions/" + question._id);
      }
  });
});

 router.get("/:id", function(req, res) {
  Question.findOne({_id: req.params.id}, function(err, question) {
    if(err) {
      res.render('error', {message: "Question Not Found",
                          error: { status: 404}});
    }
    else {
      res.render("questions/show", {question: question});
    }
  });
 });

  router.get("/:id/edit", function(req, res) {
    Question.findOne({_id: req.params.id}, function(err, question){
      if (err) { res.render('error', {message: "Error Happened",
                                      error: { status: 404}});
       }
       else {
         res.render("questions/edit", {question: question, errors: {} });
       }
    });
  });

  router.patch("/:id", function(req, res) {
    Question.findOne({_id: req.params.id}, function(err, question) {
      if (err) {
        res.render('error', {message: "Error Happened",
                                        error: { status: 404}});
      }
      else {
        question.title = req.body.title;
        question.body = req.body.body;
        question.save(function(err){
          if(err){
            res.render("questions/edit", {errors:err.errors,question: question});
            }
          else {
            // response.end(question._id.toString());
            res.redirect("/questions/" + question._id);
            }
        });
      }
    });

      // console.log("<<<<<<<<<<<<<<<<<<<<<");
      // console.log(question);
  });

// this is like an instance variable so that we can pass it around to be used in other files. We are adding more definitions to the router.
module.exports = router;
