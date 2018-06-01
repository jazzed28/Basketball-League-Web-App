const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const port = process.env.PORT || 8081;
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MongoStore = require('connect-mongo')(session);
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const User = require('./models/User');
const Team = require('./models/Team');
const Player = require('./models/Player');
const userRoute = require('./routes/auth')
const seedDB = require('./seeds');

app.use(logger('dev'));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bball", 
{
    keepAlive: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());

app.set('view engine', 'ejs');
app.use('/src',express.static(__dirname + "/src"));
app.use(methodOverride('_method'));

// Remove all players and seed players
seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: process.env.SECRET_KEY || "default-secret-key",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Routes
app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/api', (req, res) => {
    Team.findOne({teamname: "OBAR"}, (err, foundTeam) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundTeam.players);
            res.render("apihome", {team: foundTeam});
        }
    })
})

app.get('/api/teams/:tid/players/new', isLoggedIn, (req, res) => {
    Team.findById(req.params.tid, (err, foundTeam) => {
        if(err){
            console.log(err);
        } else {
            console.log("Team found");
            res.render("form", { team: foundTeam });
        }
    })
})

app.get('/api/teams/:tid/players/:pid', isLoggedIn, (req, res) => {
    Player.findById(req.params.pid, (err, foundPlayer) => {
        if(err){
            console.log(err);
        } else {
            res.render("show", {player: foundPlayer});
        }
    })
})

app.post('/api/teams/:tid/players/new', isLoggedIn, (req, res) => {
    Player.create(req.body.player, (err, createdPlayer) => {
        if(err){
            console.log(err);
        } else {
            console.log("Player created!");
            res.redirect('/api');
        }
    })
})

app.get('/api/teams/:tid/players/:pid/edit', isLoggedIn, (req, res) => {
    Player.findById(req.params.pid, (err, foundPlayer) => {
        if(err) {
            res.redirect('/api');
        } else {
            res.render("edit", { player: foundPlayer });
        }
    })
})

app.put('/api/teams/:tid', isLoggedIn, (req, res) => {
    Team.findByIdAndUpdate(req.params.tid, { $set: { "players": req.body.player } }, (err, foundTeam) => {
        if(err) {
            console.log(err);
        } else {
            console.log("--------------");
            console.log(foundTeam.players);
            // foundTeam.update(req.params.tid, { $set: { "players": "joj" } })
            // (err, updatedTeam) => {
            //     if(err) {
            //         console.log(err);
            //     } else {
            //         console.log("Team UPDATED!");
            //         foundTeam.save((err, savedTeam) => {
            //             if(err) {
            //                 console.log(err);
            //             } else {
            //                 console.log("Team saved");
            //             }
            //         })
            //     }
            // })




            // let inputPlayers = req.body.player;
            // for (const i = 0; i < foundTeam.players.length; i++) {
            //     console.log("Dang!!!!!!!!");
            //     console.log(inputPlayers[i]);
            //     Player.findByIdAndUpdate(foundTeam.players[i]._id, inputPlayers[i], (err, updatedPlayer) => {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("player updated!!!!!!!!");
            //             console.log(updatedPlayer);
            //             foundTeam.save((err, savedTeam) => {
            //                 if(err) {
            //                     console.log(err);
            //                 } else {
            //                     console.log("Team saved");
            //                 }
            //             })
            //         }
            //     })
            // }

             res.redirect('/api');

            // inputPlayers.forEach((each) => {
            //     // Player.findByIdAndUpdate()
            // })
            // foundTeam.update({$set: { players: req.body.player }}, (err, updatedTeam) => {
            //     if(err) {
            //         console.log(err);
            //     } else {
            //         console.log(updatedTeam);
            //         res.redirect('/api');
            //     }
            // })
            // foundTeam.players.map((eachPlayer, i) => {
            //     return Object.assign(req.body.player[i]);
            //     // return Object.assign(req.body.player[i]);
            // })
            // foundTeam.save((err, savedTeam) => {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log("Team saved");
            //             res.redirect('/api');
            //         }
            //     })
        }

        // foundTeam.players = Object.assign(req.body.player);
        // foundTeam.save((err, savedTeam) => {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("Team saved");
        //         res.redirect('/api');
        //     }
        // })
        
        // console.log(req.body.player);
        // if(err){
        //     console.log(err);
        //     res.redirect('/api');
        // } else {
        //     res.redirect('/api/teams/' + req.params.tid + '/players/' + req.params.pid)
        // }
    })
})

// app.delete('/api/teams/:tid/players/:pid', (req, res) => {
//     Player.findByIdAndRemove(req.params.pid, (err) => {
//         if(err) {
//             res.redirect('/api');
//         } else {
//             console.log("Player deleted");
//             res.redirect('/api');
//         }
//     })
// })

// AUTH ROUTES

// app.get('/register', (req, res) => {
//     res.send("Register");
// })

// app.post('/register', (req, res) => {
//     console.log(req.body.username);
//     const newUser = new User(
//         {
//             username: req.body.username,
//             email: req.body.email
//         });
//     User.register(newUser, req.body.password, (err, user) => {
//         if(err){
//             return res.send("register err");
//         }
//         passport.authenticate("local")(req, res, () => {
//             res.send('success registration');
//         });
//     });
// })

// app.get('/login', (req, res) => {
//     res.send("Login");
// })

// app.post('/login', passport.authenticate("local", 
//     {
//         successRedirect: '/api',
//         failureRedirect: '/login'
//     }), (req, res) => {
//     res.send("Login reached");
// })

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/api');
// })

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(port, process.env.IP, () => {
    console.log("Server has started at: ", port);
})