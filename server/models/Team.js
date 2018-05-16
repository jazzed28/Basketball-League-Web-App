var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Player = require('./Player');

var TeamSchema = new mongoose.Schema({
    teamname: String,
    note: String,
    players: [Player.schema]
}, { timestamps: true })

TeamSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Team", TeamSchema);