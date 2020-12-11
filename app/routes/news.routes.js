module.exports = app => {
    const news = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create a new News
    router.post("/", news.createNews);
  
    // Retrieve all News with issues by id
    //router.get("/", news.findAllNews);
    router.get("/", news.findAllNewsWithIssues);
//    router.get("/", news.findAllNewsWithIssuesById);


    app.use('/api/news', router);
};