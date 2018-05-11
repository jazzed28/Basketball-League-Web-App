var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var expressSanitizer = require('express-sanitizer');
var Player = require('./models/Player');
var seedDB = require('./seeds');

// Remove all players and seed players
seedDB();

mongoose.connect("mongodb://localhost/players");
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressSanitizer());

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

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
    Player.create(req.body.player, (err, createdPlayer) => {
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
    Player.findByIdAndUpdate(req.params.id, req.body.player, (err, updatedPlayer) => {
        if(err){
            console.log(err);
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
            console.log("Player deleted");
            res.redirect('/api');
        }
    })
})

app.listen(port, process.env.IP, () => {
    console.log("Server has started...");
})