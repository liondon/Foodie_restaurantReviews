const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
const Restaurant = db.Restaurant

// set up local authentication strategy
passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, username, password, cb) => {
    User.findOne({ where: { email: username } })
      .then(user => {
        if (!user) {
          return cb(null, false,
            req.flash('error_msg', 'Email doesn\'t exist!'));
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false,
            req.flash('error_msg', 'Email or Password incorrect!'));
        }
        return cb(null, user);
      })
      .catch(err => {
        return cb(err)
      })
  }
))

// set up serialize and deserialize 
// to store userID instead of whole user obj in session
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [{
      model: Restaurant,
      as: 'FavoriteRestaurants'
    }, {
      model: Restaurant,
      as: 'LikeRestaurants'
    }]
  })
    .then(user => {
      user = user.toJSON()
      return cb(null, user)
    })
})

module.exports = passport