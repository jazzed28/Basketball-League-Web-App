var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//var Team = require('./Team');

var UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    //team: Team
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: "is already taken." });
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);