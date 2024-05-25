const {USERS} = require("../../Main/dataBaseTablesName");
const db = require('../../Main/knexconfigration')
const bcrypt = require('bcrypt')
const knex = require("knex");

const createUser = async (userInfo) => {
    const user = await db(USERS).insert({
        name: userInfo.name,
        gender: userInfo.gender,
        university: userInfo.university,
        birthdate: userInfo.birthdate,
        facebook_account: userInfo.facebook_account,
        phone: userInfo.phone,
        email: userInfo.email,
        password: userInfo.password,
        type: userInfo.type
    });
    return userInfo;
}
const listUsers = async () => {
    const users = await db(USERS).returning('*')
    return users;
}

const getUser = async (userId) => {
    const user = await db(USERS).where({id: userId}).returning('*')
    return user;
}

const deleteUser = async (userId) => {
    const user = db(USERS).where('id', userId).del();
    return user
}

const isEmailExist = async (id, email) => {
    const user = await db(USERS).where('email', email).whereNot('id', id).returning('*');
    return user.length > 0;
}
const isPhoneExist = async (id, phone) => {
    const user = await db(USERS).where('phone', phone).whereNot('id', id).returning('*');
    return user.length > 0;
}
const updateUser = async (user) => {
    const userUpdate = db(USERS).where('id',user.user_id).update({
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        phone: user.phone,
        birthdate: user.birthdate,
        university: user.university,
        facebook_account: user.facebook_account,
        type: user.type
    })
    return userUpdate;

}

const updatePassword = async (user) => {
    const findUser = await db(USERS).where('id', user.user_id).first();

    if (findUser)
    {
        const isMatch = await bcrypt.compare(user.password, findUser.password);
        if(isMatch){
        const hashedPassword = await hashPassword(user.newPassword);
        const userUpdate = db(USERS).where('id',user.user_id).update({
            password: hashedPassword
        })
        return userUpdate;
        }
    }
    return false
}

// const updatePassword = async (user) => {
//     const findUser = await db(USERS).where('id', user.user_id).first();
//     if (findUser) {
//         const isMatch = await bcrypt.compare(user.password, findUser.password);
//
//         if (isMatch) {
//             const hashedPassword = await hashPassword(user.newPassword);
//             const userUpdate = await db(USERS)
//                 .where('id', user.user_id)
//                 .update({ password: hashedPassword });
//
//             return userUpdate;
//         }
//     }
//
//     return false;
// };

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}






module.exports = {
    createUser, listUsers, getUser, deleteUser, updateUser, isEmailExist, isPhoneExist , updatePassword

}