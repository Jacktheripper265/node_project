const models = require('../models');
module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      // NewsId: {
      //   type: Sequelize.INTEGER(11),
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      NewsTitle: {
        type: Sequelize.STRING(30)
      },
      News: {
        type: Sequelize.TEXT()
      },
      Locality: {
        type: Sequelize.STRING(20)
      },
      Image: {
        type: Sequelize.BIGINT(10)
      },
      Video: {
        type: Sequelize.STRING(8)
      }

      
    });
    News.associate = function(models) {
      News.hasMany(models.issue, {as: 'issues'})
    };
    return News;
  };