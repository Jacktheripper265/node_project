module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      Uid: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Uname: {
        type: Sequelize.STRING(30)
      },
      EmailId: {
        type: Sequelize.STRING(20),
        unique:true
      },
      AadharId: {
        type: Sequelize.STRING(20)
      },
      Locality: {
        type: Sequelize.STRING(20)
      },
      MobNo: {
        type: Sequelize.STRING(20)
      },
      Password: {
        type: Sequelize.STRING(150)
      },
     
      Role: {
        type: Sequelize.STRING(20)
      },
      isApproved: {
        type: Sequelize.BOOLEAN(),
        defaultValue: false
      }
    });
  
    return User;
  };