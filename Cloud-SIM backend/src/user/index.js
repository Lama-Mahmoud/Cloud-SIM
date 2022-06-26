const { Router } = require('express');
const { signup,edit, remove, login, addContact } = require('./controller/user');
const router = Router();

router.post('/auth/signup', signup);

router.post('/auth/login', login);
router.post('/auth/addcontact', addContact);

//router.post('/auth/edit', edit);
//router.post('/auth/remove', remove);

module.exports = router;