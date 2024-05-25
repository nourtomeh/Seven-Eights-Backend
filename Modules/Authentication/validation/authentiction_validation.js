const {check , param , body,query} = require('express-validator')
const express = require("express");
const db = require("../../Main/knexconfigration");
const {USERS} = require("../../Main/dataBaseTablesName");
const emailForLogin = check('email').notEmpty().withMessage('email is required').isEmail().withMessage('email should be valid')
const passwordForLogin = check('password').notEmpty().withMessage('password is required').custom(async (value)=> {
    if(value.length<6)
    {
        return Promise.reject('password should be more than 6 character ')
    }
        return Promise.resolve();
    });


const createLoginValidation = [
    emailForLogin ,
    passwordForLogin
];
module.exports = {
    createLoginValidation
}