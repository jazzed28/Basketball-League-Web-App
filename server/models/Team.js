var mongoose = require('moongose');
var uniqueValidator = require('mongoose-unique-validator');

var TeamSchema = new mongoose.Schema({
    teamname: String,
    note: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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