const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    // console.log(req.body)
    const { name, email, password, confirmPassword }
      = req.body
    if (password !== confirmPassword) {
      req.flash('error_msg', 'Password and Confirm Password doesn\'t match!')
      return res.redirect('/signup')
    }
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'This email has been registered!')
          return res.redirect('/signup')
        } else {
          User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
          })
            .then(user => {
              req.flash('success_msg', 'Registration Succeeded!')
              return res.redirect('/signin')
            })

        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('sucess.msg', 'Login succeeded!')
    return res.redirect('/restaurants')
  },

  logOut: (req, res) => {
    req.flash('sucess.msg', 'Logout succeeded!')
    req.logout()  // provided by passport
    return res.redirect('/signin')
  },
}

module.exports = userController