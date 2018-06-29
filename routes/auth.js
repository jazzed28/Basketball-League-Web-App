const passport = require('passport');
const settings = require('../passport/settings');
require('../passport/passport')(passport);
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const passport = require('../passport');

router.post('/register', 
  (req, res) => {
    if(!req.body.username || !req.body.password) {
      res.json({
        success: false,
        msg: 'Please pass username and password.'
      })
    }
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
  // passport.authenticate('local'),
  (req, res) => {
    // console.log("logged in", req.user);
    // var userInfo = {
    //   username: req.user.username
    // };
    // res.send(userInfo);

    User.findOne({
      username: req.body.username
    }, (err, user) => {
      if(err) throw err;

      if(!user){
        res.status(401).send({
          success: false, 
          msg: 'Authentication failed. User not found.'
        })
      } else {
        console.log("just before comparing pw");
        if(user.comparePassword(req.body.password)) {
          var token = jwt.sign(user.toJSON(), settings.secret);
          res.json({
            success: true,
            token: 'JWT ' + token
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          })
        }
      }
    })
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