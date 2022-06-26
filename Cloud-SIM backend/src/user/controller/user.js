const {  addUser, getByEmail,newContact,edit,removeContact,getAll } = require('../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../model/User');
const { get } = require('@mongoosejs/double');
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
      const id=req._id;
      const userid=req.user
      const updateUser=await User.findByIdAndUpdate(userid,
        {$pull:{
          contacts:{id,}
        }});
        console.log(updateUser)
      return res.send({contact: removeResult});
    }
    catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }

  async function contacts(req,res){
    try{
      const getcontacts=await getAll(req.query);
      console.log("contacs",getcontacts);
      return res.send(getcontacts);
    }
    catch(error){
        console.log(error)
    }
  }
  


  module.exports={
    signup,
    login,
    addContact,
    editContact,
    remove,
    contacts
  };