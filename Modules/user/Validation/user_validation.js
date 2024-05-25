const {check, param, body, query} = require('express-validator')
const e = require("express");
const db = require('../../Main/knexconfigration')
const {USERS} = require("../../Main/dataBaseTablesName");

const allowedTypes = ['student', 'teacher', 'officer', 'admin'];

const name = check('name').notEmpty().withMessage('name is required')
const gender = check('gender').notEmpty().withMessage('gender is required')
const birthdate = check('birthdate').notEmpty().withMessage('birthdate is required').isDate().withMessage('Invalid date format')
const university = check('university').notEmpty().withMessage('university is required')
const facebook_account = check('facebook_account').notEmpty().withMessage('facebook_account is required')
const phone = check('phone').notEmpty().withMessage('phone is required').custom(async (value) => {
    if (value.length < 10 || !/^\d+$/.test(value)) {
        return Promise.reject('Phone must be at least 10 characters and only numbers');
    }
    const userPhone = await db(USERS).where('phone', value).returning('*')
    if (userPhone.length > 0) {
        return Promise.reject('phone number is taken')
    } else {
        return Promise.resolve();
    }

});
const email = check('email').notEmpty().withMessage('email is required').isEmail().withMessage('email should be valid').custom(async (value) => {
    if (!value.endsWith('@gmail.com')) {
        return Promise.reject('Only Gmail Account are allowed');
    }
    const userEmail = await db(USERS).where('email', value).returning('*')
    if (userEmail.length > 0) {
        return Promise.reject('Email is taken')
    }
    return Promise.resolve()
});
const password = check('password').notEmpty().withMessage('password is required').custom(async (value) => {
    if (value.length < 6) {
        return Promise.reject('password should be more than 6 character ')
    }
    return Promise.resolve();
});
const emailForUpdates = check('email').notEmpty().withMessage('email is required')
const PhoneForUpdates = check('phone').notEmpty().withMessage('phone is required')
const type = check('type').notEmpty().withMessage('type is required').isIn(allowedTypes).withMessage('Invalid type');
const newPassword = check('newPassword').notEmpty().withMessage('newPassword is required').custom(async (value) => {
    if (value.length < 6) {
        return Promise.reject('password should be more than 6 character ')
    }
    return Promise.resolve();
});
const confirmPassword = check('confirmPassword').notEmpty().withMessage('confirmPassword is required').custom(async (value, {req}) => {
    if (value !== req.body.newPassword) {
        return Promise.reject('password does not match')
    }
    return Promise.resolve();
});
const userCreateValidation = [
    name,
    gender,
    university,
    birthdate,
    facebook_account,
    phone,
    email,
    password,
    type
];
const userUpdateValidation = [
    name,
    gender,
    university,
    birthdate,
    facebook_account,
    PhoneForUpdates,
    emailForUpdates,
    password,
    type
];
const signUpValidation = [
    name,
    gender,
    university,
    birthdate,
    facebook_account,
    phone,
    email,
    password,
];
const updatePasswordUserValidation = [
    password,
    newPassword,
    confirmPassword
]


module.exports = {
    userCreateValidation, userUpdateValidation, signUpValidation ,updatePasswordUserValidation
}


