var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var PlayerSchema = new mongoose.Schema({
    number: Number,
    firstname: String,
    lastname: String,
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    mobile: String,
}, { timestamps: true })

PlayerSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Player", PlayerSchema);
