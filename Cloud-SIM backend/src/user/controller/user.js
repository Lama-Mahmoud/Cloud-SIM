const {  addUser, addContact } = require('../services');
const bcrypt = require('bcryptjs');

async function signup(req, res) {
    console.log("I'm here");
    try {
      console.log(req.body);
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
  
      const addUserResult = await addUser(req.body, hashPassword);
      console.log('addUserResult =>', addUserResult);
      
      return res.send({ user: addUserResult._id });
    } catch (error) {
      console.log(error);
    }
  }

  module.exports={
    signup
  };