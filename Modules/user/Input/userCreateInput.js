class UserCreateInput {

    constructor(name, email, password, gender, phone, birthdate, university, facebook_account) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.phone = phone;
        this.birthdate = birthdate;
        this.university = university;
        this.facebook_account = facebook_account;
    }
}


module.exports = {
    UserCreateInput
}