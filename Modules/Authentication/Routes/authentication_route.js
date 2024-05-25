const express = require('express');
const router = express.Router();
const {createLoginValidation} = require('../validation/authentiction_validation')
const {loginApiUsingPost} = require('../controller/authentication_controller')
const {signUpValidation} = require('../../user/Validation/user_validation')
const {signUpUsingPost} = require('../..//Authentication/controller/authentication_controller')
router.post('/login' , createLoginValidation , loginApiUsingPost)
    .post('/signup' , signUpValidation  , signUpUsingPost)



module.exports = router