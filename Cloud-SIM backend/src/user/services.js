const User = require('../../model/User');
const Contact = require('../../model/Contact');


async function addUser(body, hashPassword) {
    
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

  
  async function newContact(body) {
    const{
        name,
        phone,
        Relation,
        location,
        user
    }=body
    const cont = new Contact({name,
        phone,
        Relation,
        location,
        user});
    return await cont.save();
  }

  module.exports={
    addUser,
    getByEmail,
    newContact
  };