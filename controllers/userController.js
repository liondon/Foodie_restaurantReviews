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
    User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
      .then(user => {
        return res.redirect('/signin')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = userController