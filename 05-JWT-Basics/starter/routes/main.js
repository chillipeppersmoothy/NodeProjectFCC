const express = require('express');
const { login, dashboard } = require('../controllers/main'); 
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.route('/login').post(login);

router.route('/dashboard').get(authMiddleware,dashboard);

module.exports = router;