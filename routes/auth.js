const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../passport');

router.post('/', 
  (req, res) => {
    console.log("User signup");
    const { username, password } = req.body;

    // Add Validation
    User.findOne({ username: username }, (err, user) => {
      if(err) {
        console.log("User post error: ", err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`
        })
      } else {
        const newUser = new User({
          username,
          password
        })
        newUser.save((err, savedUser) => {
          if(err) return res.json(err);
          res.json(savedUser);
        })
      }
    })
  }
)

router.post('/login', 
  (req, res, next) => {
    console.log("User login req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
)

router.get('/',
  isLoggedIn,
  (req, res, next) => {
    console.log("===== user =====");
    console.log(req.user);
    if(req.user) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  }
)

router.post('/logout', 
  (req, res) => {
    if(req.user) {
      req.logout();
      res.send({ msg: 'Logging out' });
    } else {
      res.send({ msg: 'No user to log out' });
    }
  }
)

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('../login');
}

module.exports = router;