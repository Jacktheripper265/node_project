module.exports = app => {
    const issue = require("../controllers/issue.controller.js");
  
    var router = require("express").Router();
  
    // Create a new News
    router.post("/", issue.createIssue);
  
    // Retrieve all Tutorials
    router.get("/", issue.findAllIssues);

    app.use('/api/issue', router);
};