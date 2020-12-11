module.exports = (sequelize, Sequelize) => {
    const Issue = sequelize.define("issue", {
      IssueId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Issue: {
        type: Sequelize.TEXT()
      }
      
    }
    );
  
    return Issue;
  };