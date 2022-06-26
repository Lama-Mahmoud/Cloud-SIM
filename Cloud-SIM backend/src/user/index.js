const { Router } = require('express');
const { signup,editContact, remove, login, addContact,contacts } = require('./controller/user');
const router = Router();

router.post('/auth/signup', signup);

router.post('/auth/login', login);

router.post('/auth/addcontact', addContact);

router.post('/auth/edit', editContact);

router.post('/auth/remove', remove);

router.post('/auth/contacts', contacts);

module.exports = router;