const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User
const Favorite = db.Favorite
const Like = db.Like
const Followship = db.Followship

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

  addFavorite: async (req, res) => {
    const { restaurantId } = req.params
    const favorite = await Favorite.create({
      UserId: req.user.id,
      RestaurantId: restaurantId
    })
    return res.redirect('back')
  },

  removeFavorite: async (req, res) => {
    const { restaurantId } = req.params
    const favorite = await Favorite.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: restaurantId
      }
    })
    await favorite.destroy()
    return res.redirect('back')
  },

  addLike: async (req, res) => {
    const { restaurantId } = req.params
    const like = await Like.create({
      UserId: req.user.id,
      RestaurantId: restaurantId
    })
    return res.redirect('back')
  },

  removeLike: async (req, res) => {
    const { restaurantId } = req.params
    const like = await Like.findOne({
      where: {
        UserId: req.user.id,
        RestaurantId: restaurantId
      }
    })
    await like.destroy()
    return res.redirect('back')
  },

  getTopUser: async (req, res) => {
    try {
      let users = await User.findAll({
        include: [
          { model: User, as: 'Followers' }
        ]
      })
      users = users.map(user => ({
        ...user.dataValues,
        FollowerCount: user.Followers.length,
        isFollowed: req.user.Followings.map(d => d.id).includes(user.id)
      }))
      users = users.sort((a, b) => b.FollowerCount - a.FollowerCount)
      return res.render('topUser', { users: users })
    } catch (err) {
      console.log(err)
    }
  },

  addFollowing: async (req, res) => {
    try {
      await Followship.create({
        followerId: req.user.id,
        followingId: req.params.userId
      })
      return res.redirect('back')
    } catch (err) {
      console.log(err)
    }
  },

  removeFollowing: async (req, res) => {
    try {
      const followship = await Followship.findOne({
        where: {
          followerId: req.user.id,
          followingId: req.params.userId
        }
      })
      await followship.destroy()
      return res.redirect('back')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = userController