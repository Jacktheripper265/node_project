module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.createUser);
    router.post('/findUser',users.findUser)
    router.get('/getUser',users.getUser)
    router.post('/setPermission',users.setPermission)
    router.post('/DeleteUser',users.DeleteUser)
    // Retrieve all Tutorials
   // router.get("/", users.findAllUsers);
    router.get("/", users.findNotApprUsers);
    router.put("/:id", users.updateUsersIsAppr);
    app.use('/api/users', router);
};