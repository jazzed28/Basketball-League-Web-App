var mongoose = require('moongose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    }
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", UserSchema);