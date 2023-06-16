const express = require('express');
const router = express.Router();

const userControllers = require('./Controllers/userControllers')
const sessionController = require('./Controllers/sessionControllers')


router.post('/generate', userControllers.generateToken, (req, res) => {
    res.status(200).json(res.locals.token)
})

router.post('/login', userControllers.verifyUser, (req, res) => {
  res.status(200).send(res.locals.loggedIn)
})

router.get('/session', sessionController.getId, sessionController.getUsers, (req, res) => {
  res.status(200).send(res.locals.users)
})

router.get('/details', sessionController.getId, sessionController.getDetails, (req, res) => {
  res.status(200).send(res.locals.details)
})

// router.get('videosdk/sessions/{}/users')

module.exports = router;