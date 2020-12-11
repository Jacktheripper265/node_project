const db = require("../models");
const { QueryTypes } = require('sequelize');
//const { Sequelize } = require('sequelize');
const getNews = db.news;
const Issues = db.issue;
const Op = db.Sequelize.Op;

// Create and Save a new News
exports.createNews = (req, res) => {
   // Validate request
   if (!req.body.NewsTitle) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  }

  // Create a News
  const news = {
    
    NewsTitle: req.body.NewsTitle,
    News: req.body.News,
    Locality: req.body.Locality,
    Image: req.body.Image,
    Video: req.body.Video
    
  };

  // Save News in the database
  getNews.create(news)
    .then(data => {
        console.log(data);
        
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the News."
      });
    });
};

//Find all news
exports.findAllNews = (req, res) => {
    getNews.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving News."
        });
      });
  };

//get issues for given news
  

//   exports.findAllNewsWithIssuesById = (req,res) => {
    


//     getNews.findByPk(2, {include: ['issues']})
// .then((news) => {
  
//   res.send(news);
  
// })
// .catch((err) => {
//   console.log("Error while find news : ", err)
// })

// };


//find all news with issues

exports.findAllNewsWithIssues = (req,res) => {
    


      getNews.findAll({include: ['issues']})
  .then((news) => {
    
    res.send(news);
    
  })
  .catch((err) => {
    console.log("Error while find news : ", err)
  })
  
  };
  