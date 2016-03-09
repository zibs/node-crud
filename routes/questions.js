var express = require("express");
var router = express.Router();
// creating a route ^^ technically a controller.

router.get("/new", function(request, response, next) {
  // response object, can call end on it, we can finish the request and can send something back to the user. End(text) Render(template) Redirect(url).
  response.end("Create New Question");
});

// this is like an instance variable so that we can pass it around to be used in other files. We are adding more definitions to the router.
module.exports = router;
