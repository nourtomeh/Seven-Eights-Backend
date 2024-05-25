const {validationResult} = require('express-validator')
const {createUser, listUsers, getUser, deleteUser , updateUser ,isEmailExist , isPhoneExist , updatePassword } = require('../Services/userService')
const {UserCreateInput} = require('../Input/userCreateInput')
const {UserUpdateInput} = require('../Input/userUpdateInput')
const {ChangePasswordInput} = require('../Input/changePasswordInput')
const bcrypt = require('bcrypt')
const userCreateUsingPost = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            result: errors
        })

    }
    const {name, email, password, gender, phone, birthdate, university, facebook_account ,type} = req.body;
    const hashedPassword =await hashPassword(password);

    let user = new UserCreateInput();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.gender = gender;
    user.phone = phone;
    user.birthdate = birthdate;
    user.university = university;
    user.facebook_account = facebook_account;
    user.type = type;
    // console.log(password + "  " + hashedPassword)
    const created = await createUser(user);
    res.json({
        result: created
    })

}

const userListUsingGet = async (req, res) => {
    const users = await listUsers();
    res.json({
        result: users
    })


}

const getUserUsingGet = async (req, res) => {
    const {user_id} = req.params;
    const user = await getUser(user_id);
    res.json({
        result: user
    })
}

const deleteUserUsingDelete = async (req, res) => {
    const {user_id} = req.params;
    const user = await deleteUser(user_id);
    res.json({
        result: user
    })
}

const updateUserUsingPut = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    const {name, email, password, gender, phone, birthdate, university, facebook_account,type} = req.body;
    const {user_id} = req.params;

    const emailValidation = await isEmailExist(user_id, email);
    if (emailValidation) {
        return res.status(422).json({
            error: 'Email is taken'
        });
    }const phoneValidation = await isPhoneExist(user_id, phone);
    if (phoneValidation) {
        return res.status(422).json({
            error: 'Phone is taken'
        });
    }

    let user = new UserUpdateInput();
    user.user_id = user_id;
    user.name = name;
    user.email = email;
    user.password = password;
    user.gender = gender;
    user.phone = phone;
    user.birthdate = birthdate;
    user.university = university;
    user.facebook_account = facebook_account;
    user.type = type;

    const userUpdated = await updateUser(user);
    res.json({
        body : req.body,
        parameter :req.params
    })

}

const updatePasswordUsingPatch = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    const {password ,newPassword ,confirmPassword} = req.body;
    const {user_id} = req.params;
    let user = new ChangePasswordInput();
    user.user_id = user_id;
    user.password = password;
    user.newPassword = newPassword;
    user.confirmPassword = confirmPassword;
    const passwordUpdated = await updatePassword(user);
    res.json({
        result: passwordUpdated
    })
}

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}



module.exports = {
    userCreateUsingPost, userListUsingGet, getUserUsingGet, deleteUserUsingDelete,updateUserUsingPut ,hashPassword ,updatePasswordUsingPatch
}