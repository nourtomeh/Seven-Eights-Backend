var express = require('express')
const router = express.Router();
const {userCreateValidation ,userUpdateValidation,updatePasswordUserValidation} = require('../Validation/user_validation')
const {userCreateUsingPost , userListUsingGet , getUserUsingGet , deleteUserUsingDelete , updateUserUsingPut ,updatePasswordUsingPatch} = require("../controller/userController");
const {authenticated} = require('../../Authentication/middleware/authentication_middleware')

router.post('/users' , userCreateValidation, userCreateUsingPost)
    .get('/users' ,userListUsingGet)
    .get('/users/:user_id', authenticated , getUserUsingGet)
    .delete('/users/:user_id' , deleteUserUsingDelete)
    .put('/users/:user_id'  , userUpdateValidation , updateUserUsingPut)
    .patch('/users/:user_id' , updatePasswordUserValidation , updatePasswordUsingPatch)
module.exports= router;