const {  addUser, getByEmail,newContact,edit,removeContact } = require('../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../model/User');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";


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

  async function login(req, res) {
    try {
      const user = await getByEmail(req.body.email);
      if (!user) return res.status(400).send('invalid credentials');
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send('invalid credentials');
  
      const token = jwt.sign(
        {_id: user._id, name: user.name, email: user.email},
        TOKEN_SECRET
      );
  
      return res.header('auth-token', token).send(token);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  async function addContact(req,res){
    try{
        const addContactResult = await newContact(req.body);

        console.log('addContactResult =>', addContactResult);
        const updateUser=await User.findByIdAndUpdate(addContactResult.user,
            {$push:{
                contacts:addContactResult._id
            }

            });
        return res.send({ contact: addContactResult._id });

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
  }
  async function editContact(req,res){
    try{
      const editresult= await edit(req.body);
      console.log('edit results=>',editresult);
      return res.send({contact: editresult});
    }
    catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }


  async function remove(req,res){
    try{
      const removeResult= await removeContact(req.body);
      console.log('edit results=>',removeResult);
      const updateUser=await User.updateOne(req.user,
        {$pull:{
          contacts:{"_id":req._id,}
        }});
        console.log(updateUser)
      return res.send({contact: removeResult});
    }
    catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }


  module.exports={
    signup,
    login,
    addContact,
    editContact,
    remove
  };