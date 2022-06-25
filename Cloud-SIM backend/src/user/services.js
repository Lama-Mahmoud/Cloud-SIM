const User = require('../../model/User');
const Task = require('../../model/Contact');


async function addUser(body, hashPassword) {
    
    console.log("I'm here addUser");

    const {
      name,
      email,
    } = body;
  
    const user = new User({
      name,
      email,
      password: hashPassword
    });
  
    return await user.save();
  }

  
async function getByEmail(email) {
    return await User.findOne({
      email
    });
  }


  module.exports={
    addUser,
    getByEmail
  };