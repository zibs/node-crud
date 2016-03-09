var express = require("express");
var router = express.Router();
var Question = require("../models/question");
// creating a route ^^ technically a controller.

router.get("/new", function(request, response, next) {
  // response object, can call end on it, we can finish the request and can send something back to the user. End(text) Render(template) Redirect(url).
  // response.end("Create New Question");
  response.render("questions/new");
});

router.post("/", function(request, response, next){
  //
  // for(var k in request) {
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
  //   console.log("1 >>>> " + k);
  //   console.log("2 >>>> " + request[k]);
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
  // }
  var question = new Question({title: request.body.title,
                               body: request.body.body});
  question.save(function(err, question){
    // response.end("Got it");
    if(err){
      response.end("Got Errors!");
    } else {
        response.end(question._id.toString());
      }
  });
});

// this is like an instance variable so that we can pass it around to be used in other files. We are adding more definitions to the router.
module.exports = router;
