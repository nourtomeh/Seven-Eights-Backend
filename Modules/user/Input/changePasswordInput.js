class ChangePasswordInput {
    constructor(user_id ,password, newPassword,confirmPassword){
        this.user_id = user_id;
        this.password = password;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}
module.exports = {
    ChangePasswordInput
}