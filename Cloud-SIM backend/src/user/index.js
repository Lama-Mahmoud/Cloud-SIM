const { Router } = require('express');
const { signup,edit, remove, login } = require('./controller/user');
const router = Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/edit', edit);
router.post('/auth/remove', remove);