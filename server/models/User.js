const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
//var Team = require('./Team');

const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, lowercase: true, unique: true, required: [false, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    //team: Team
}, { timestamps: true })

// Define schema methods
UserSchema.methods = {
    checkPassword: inputPassword => {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: textPassword => {
        return bcrypt.hashSync(textPassword, 10);
    }
}

UserSchema.pre('save', next => {
    if(!this.password) {
        console.log("models/user ------NO PASSWORD PROVIDED------");
        next();
    } else {
        console.log("models/user hashPassword in pre save");

        this.password = this.hashPassword(this.password);
        next();
    }
})


UserSchema.plugin(uniqueValidator, { message: "is already taken." });
// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);