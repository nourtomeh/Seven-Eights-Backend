const {USERS} = require("../../Main/dataBaseTablesName");
const db = require('../../Main/knexconfigration')
const bcrypt = require('bcrypt')

const login = async (userCredential) => {


    const user = await db(USERS).where('email', userCredential.email).first();
    if (user) {
        const isMatch = await bcrypt.compare(userCredential.password, user.password);
        if (isMatch) {
            return user;
        }
    } else {
        return null ;
    }
}

const signup = async (user) => {
    const userCreated = await db(USERS).insert(
        {
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            phone: user.phone,
            birthdate: user.birthdate,
            university: user.university,
            facebook_account: user.facebook_account,
            type: user.type
        }
    ).returning('*');
    return userCreated;
}
module.exports = {
    login , signup
}

