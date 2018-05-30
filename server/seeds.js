var mongoose = require('mongoose');
var Team = require('./models/Team');
var Player = require('./models/Player');
var User = require('./models/User');

var rosterData = [
    {
        number: "2",
        firstname: "Peter",
        lastname: "Son",
        email: "email1@gmail.com",
        mobile: "0213892833",
    },
    {
        number: "5",
        firstname: "Richard",
        lastname: "Wang",
        email: "email2@gmail.com",
        mobile: "021123492833",
    },
    {
        number: "6",
        firstname: "Tony",
        lastname: "Ju",
        email: "email3@gmail.com",
        mobile: "021389232",
    },
    {
        number: "1",
        firstname: "Jin",
        lastname: "Doj",
        email: "email4@gmail.com",
        mobile: "2342434",
    },
    {
        number: "3",
        firstname: "Derek",
        lastname: "Pin",
        email: "email5@gmail.com",
        mobile: "234523",
    },
    {
        number: "4",
        firstname: "Wan",
        lastname: "Todi",
        email: "email6@gmail.com",
        mobile: "213415",
    },{
        number: "7",
        firstname: "Won",
        lastname: "Bay",
        email: "emai7@gmail.com",
        mobile: "3765",
    },
    {
        number: "8",
        firstname: "Create",
        lastname: "Fj",
        email: "email8@gmail.com",
        mobile: "345635346",
    },
    {
        number: "9",
        firstname: "Doli",
        lastname: "Nemo",
        email: "email9@gmail.com",
        mobile: "456546",
    },
    {
        number: "10",
        firstname: "Pop",
        lastname: "Culture",
        email: "emai10@gmail.com",
        mobile: "2375646",
    },
    {
        number: "11",
        firstname: "Thomas",
        lastname: "Su",
        email: "email11@gmail.com",
        mobile: "2345345",
    },
    {
        number: "12",
        firstname: "John",
        lastname: "Mand",
        email: "email12@gmail.com",
        mobile: "45746",
    }
]

var userData = [
    {
        username: "bballlover",
        email: "owner@gmail.com",
        password: "simple",
    }
]

var teamData =
    {
        teamname: "OBAR",
        note: "Hello this is note and we would like to let you know"
    }

function seedDB(){
    Team.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("teams removed successfully!");
    });
    Player.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("players removed successfully!");
    });
    User.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("users removed successfully!");
    })
    var newTeam = new Team(teamData);
    rosterData.forEach((eachPlayer) => {
        let newPlayer = new Player(eachPlayer);
        newPlayer.save((err, savedPlayer) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Saved Player: " + savedPlayer);
            }
        })
        newTeam.players.push(newPlayer);
    })
    newTeam.save((err, savedTeam) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Saved Team: " + savedTeam);
        }
    });
    userData.forEach((eachUser) => {
        var newUser = new User(eachUser);
        newUser.save((err, savedUser) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Saved User: " + savedUser);
            }
        })
    })
}

module.exports = seedDB;