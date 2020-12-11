
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt=require('bcrypt');
// Create and Save a new User
const salt = bcrypt.genSaltSync(10);
exports.createUser = (req, res) => {
   // Validate request
   console.log(req.body)
   if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  let hash = bcrypt.hashSync(req.body.password,salt);
  // Create a User
  const user = {
    Uname: req.body.username,
    EmailId: req.body.email,
    AadharId: req.body.aadhar,
    Locality: req.body.city,
    MobNo: req.body.mobile,
    Password: hash,
    Role: req.body.role,
    isApproved: req.body.permission
  };
console.log(user)
  // Save User in the database
  Users.create(user)
    .then(data => {
        console.log(data);
        
      res.send(data);
    })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the User."
    //   });
    // });
};

exports.findAllUsers = (req, res) => {
    Users.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };


  //Find users who has not approved
  
  exports.findNotApprUsers = (req, res) => {
    var condition =
    {
      where:
      {
        isApproved:false
    
      }    
    }
    Users.findAll(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };


  //Update isApproved field to true for approved users
  exports.updateUsersIsAppr = (req, res) => {
    const postData = req.body.isApproved;
    const UId = req.params.id;
    console.log(postData);
    console.log(UId);
  const [numberOfAffectedRows, affectedRows] = Users.update({ 
    isApproved: postData
  }, {
    where: {Uid: UId},
    returning: true, // needed for affectedRows to be populated
    plain: true // makes sure that the returned instances are just plain objects
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating isApproved field."
    });
  });
};
  
exports.findUser=async function(req,res)
{
  
    let data=req.body;
    console.log(data.email);
    var condition =
    {
      where:
      {
        EmailId:data.email
    
      }    
    }
    let user=await Users.findOne(condition).then(data => {
     return data;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
      

    
      let setUser={
        id:user.Uid,
        city:user.Locality,
        email:user.EmailId,
        permission:user.isApproved,
        role:user.Role
    }
   
   
   console.log(bcrypt.compareSync(data.password,user.Password))
    if(await bcrypt.compareSync(data.password, user.Password))
    {
       

        if(user.Role=='admin')
        {
            res.send({msg:"admin login successfull",user:setUser})

        }
        else{
            
            if(user.isApproved===true)
            {
                console.log(user.isApproved);
                res.send({msg:'reporter login successful',user:setUser});

            }
            else{
                res.send({per:'permission denied'});
            }

        }
       

    }
    else{
        
        res.send({msg:'wrong password'});
    }
    
   
    
}

exports.getUser=async function(req,res)
{
  var condition =
    {
      where:
      {
       isApproved:false
    
      }    
    }
  let users=await Users.findAll(condition).then(data => {
    return data;
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Users."
     });
   });
   console.log(users)
    if(users===null)
    {
        res.send({msg:'no user found'});
    }
    else{
        res.send({users:users});
    }
}
// await User.update({ name:'Pen' })
// .set({
//   name:'Finn'
// });
exports.setPermission=async function(req,res)
{
  console.log('reached')
    const { email }=req.body;
    console.log(email)
    await Users.update({ 
      isApproved: true
    }, {
      where: {EmailId:email},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating isApproved field."
      });
    });
    
}



exports.DeleteUser=async function(req,res)
{
  console.log('reached')
    const { email }=req.body;
    console.log(email)
    await Users.destroy( {
      where: {EmailId:email},
     
    })
    .then(data => {
      console.log(data);
      res.sendStatus("deleted");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating isApproved field."
      });
    });
    
}
