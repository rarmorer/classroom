const express = require('express');
const router = express.Router();

const userController = require('./Controllers/userController')
const sessionController = require('./Controllers/sessionController')


router.post('/generate', userController.generateToken, (req, res) => {
    res.status(200).json(res.locals.token)
})

router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).send(res.locals.loggedIn)
})

// router.get('videosdk/sessions/{}/users')

module.exports = router;