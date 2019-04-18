const express = require('express');
const router = express.Router();
const authService = require('./services/AuthService');

router.post('/signup', authService.signup);
router.post('/login', authService.login);
router.get('/openid/:provider', (req, res) => authService.addOpenIdUser(req, res));

//Only authenticated users can access this route
router.get('/users', authService.isAuthenticated, (req, res) => authService.getUsers(req, res));

module.exports = router;