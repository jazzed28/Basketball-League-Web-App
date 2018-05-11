var mongoose = require('mongoose');
var Player = require('./models/Player');

var playerData = [
    {
        number: "2",
        firstname: "Peter",
        lastname: "Son",
        email: "email@gmail.com",
        mobile: "0213892833",
        note: "This is a note"
    },
    {
        number: "5",
        firstname: "Richard",
        lastname: "Wang",
        email: "email2@gmail.com",
        mobile: "021123492833",
        note: "This is a note2"
    },
    {
        number: "6",
        firstname: "Tony",
        lastname: "Ju",
        email: "email3@gmail.com",
        mobile: "021389232",
        note: "This is a note3"
    }
]

function seedDB(){
    Player.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("removed successfully!");
        playerData.forEach((seed) => {
            Player.create(
                seed, (err, createdPlayer) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added player");
                        console.log(createdPlayer);
                    }
                }
            )
        })
    });
}

module.exports = seedDB;