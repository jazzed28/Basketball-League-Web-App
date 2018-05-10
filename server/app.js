var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/players");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(expressSanitizer());
app.use(methodOverride('_method'));

var playerSchema = new mongoose.Schema({
    fullname: String,
    firstname: String,
    lastname: String,
    email: String,
    mobile: String,
    note: String
})

var Player = mongoose.model("Player", playerSchema);

// Player.create(
//     {
//         fullname: "Richard Wang",
//         firstname: "Richard",
//         lastname: "Wang",
//         email: "email2@gmail.com",
//         mobile: "021123492833",
//         note: "This is a note2"
//     }, (err, player) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Player created");
//             console.log(player);
//         }
//     }
// )
// var players = [
//     {
//         fullname: "Peter Son",
//         firstname: "Peter",
//         lastname: "Son",
//         email: "email@gmail.com",
//         mobile: "0213892833",
//         note: "This is a note"
//     },
//     {
//         fullname: "Richard Wang",
//         firstname: "Richard",
//         lastname: "Wang",
//         email: "email2@gmail.com",
//         mobile: "021123492833",
//         note: "This is a note2"
//     },
//     {
//         fullname: "Tony Ju",
//         firstname: "Tony",
//         lastname: "Ju",
//         email: "email3@gmail.com",
//         mobile: "021389232",
//         note: "This is a note3"
//     }
// ]

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/api', (req, res) => {
    Player.find({}, (err, allplayers) => {
        if(err){
            console.log(err);
        } else {
            console.log("Players found");
            res.render("apihome", {players: allplayers});
        }
    })
    // res.render("apihome", {players: players});
})

app.get('/api/rosters/new', (req, res) => {
    res.render("form");
})

app.get('/api/rosters/:id', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        if(err){
            console.log(err);
        } else {
            res.render("show", {player: foundPlayer});
        }
    })
})

app.post('/api/rosters/new', (req, res) => {
    req.body.sanitized = req.sanitize(req.body.player.body);
    Player.create(req.body.sanitized, (err, createdPlayer) => {
        if(err){
            console.log(err);
        } else {
            console.log("Player created!");
            res.redirect('/api');
        }
    })
})

app.get('/api/rosters/:id/edit', (req, res) => {
    Player.findById(req.params.id, (err, foundPlayer) => {
        if(err) {
            res.redirect('/api');
        } else {
            res.render("edit", {player: foundPlayer});
        }
    })
})

app.put('/api/rosters/:id', (req, res) => {
    req.body.sanitized = req.sanitize(req.body.player.body);
    Player.findByIdAndUpdate(req.params.id, req.body.sanitized, (err, updatedPlayer) => {
        if(err){
            res.redirect('/api');
        } else {
            res.redirect('/api/rosters/' + req.params.id)
        }
    })
})

app.delete('/api/rosters/:id', (req, res) => {
    Player.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.redirect('/api');
        } else {
            consolo.log("Player deleted");
            res.redirect('/api');
        }
    })
})

app.listen(port, process.env.IP, () => {
    console.log("Server has started...");
})