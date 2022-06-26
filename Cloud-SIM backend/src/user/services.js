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

  async function edit(body) {
    const filter={_id:body._id};
    const{
        _id,
        name,
        phone,
        Relation,
        location,
        user
    }=body
    const cont = new Contact({
        _id,
        name,
        phone,
        Relation,
        location,
        user});
    return await Contact.replaceOne(filter,cont);
  }

  async function removeContact(body)
  {
      const filter={_id:body._id};
      const{
        _id,
        name,
        phone,
        Relation,
        location,
        user
    }=body
    const cont = new Contact({
        _id,
        name,
        phone,
        Relation,
        location,
        user});
      return await Contact.deleteOne(filter,cont);
  }

  module.exports={
    addUser,
    getByEmail,
    newContact,
    edit,
    removeContact
  };