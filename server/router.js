const express = require('express');
const router = require('./router');

const jwtController = require('./Controllers/userController.js')


router.post('/generate', jwtController.generateToken, (req, res) => {
    res.status(200).json(res.locals.token)
})
