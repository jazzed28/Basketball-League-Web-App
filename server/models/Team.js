var mongoose = require('moongose');
var uniqueValidator = require('mongoose-unique-validator');

var TeamSchema = new mongoose.Schema({
    teamname: String,
    note: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    roster: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player"
        }
    ]
}, { timestamps: true })

TeamSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Team", TeamSchema);