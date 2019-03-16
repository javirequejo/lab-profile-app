const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const uploader = require('../configs/storage.config');

router.post('/register', auth.register);
router.post('/authenticate', auth.authenticate);
router.get('/profile', auth.getUser);
router.put('/profile', uploader.single('attachment'), auth.updateUser);
router.get('/logout', auth.logout);

module.exports = router;
