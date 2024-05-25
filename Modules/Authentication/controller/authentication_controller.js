const express = require('express')
const {validationResult, check} = require('express-validator')
const LoginInput = require('../Input/loginInput')
const SignUpInput = require('../Input/signUpInput')
const {login, signup} = require('../service/authentication_service')
const jwt = require('jsonwebtoken')
const e = require("express");
const bcyrpt = require("bcrypt");
const loginApiUsingPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            result: errors.array()
        })
    }
    const {email, password} = req.body;
    let userCredential = new LoginInput();
    userCredential.email = email;
    userCredential.password = password;
    const user = await login(userCredential);
    if (user) {
        const userInfo = user[0];
        const accessToken = jwt.sign({userInfo}, 'loginKey')
        res.json({
            user: user,
            accessToken: accessToken
        })
    } else {
       return  res.status(401).json({
            result: 'invalid'
        })
    }
}

const signUpUsingPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: errors.array()
        })
    }
    const {name, email, password, gender, phone, birthdate, university, facebook_account} = req.body;
    const type = 'student';
    const hashedPassword = await hashPassword(password);


    const user = new SignUpInput();
    user.name = name
    user.email = email
    user.password = hashedPassword
    user.gender = gender
    user.phone = phone
    user.birthdate = birthdate
    user.university = university
    user.facebook_account = facebook_account
    user.type = type;
    const registration = await signup(user);
    const [userCreated] = registration;
    const accessToken = jwt.sign({userCreated}, 'loginKey')
    res.json({
        result: registration,
        accessToken: accessToken
    })

}


const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcyrpt.hash(password, saltRounds);
    return hashedPassword;
}


module.exports = {
    loginApiUsingPost, signUpUsingPost
}