const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const userController = require('../controllers/userController')
const commentController = require('../controllers/commentController')

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}

const authenticateAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.redirect('/')
  }
  return res.redirect('/signin')
}

router.get('/restaurants/feeds', authenticate, restController.getFeeds)
router.get('/restaurants/top', authenticate, restController.getTopRestaurants)
router.get('/restaurants/:id', authenticate, restController.getRestaurant)
router.get('/restaurants', authenticate, restController.getRestaurants)
router.get('/', authenticate, (req, res) => res.redirect('/restaurants'))

router.delete('/comments/:id', authenticateAdmin, commentController.deleteComment)
router.post('/comments', authenticate, commentController.postComment)

router.get('/admin/restaurants/create', authenticateAdmin, adminController.createRestaurant)
router.get('/admin/restaurants/:id/edit', authenticateAdmin, adminController.editRestaurant)
router.get('/admin/restaurants/:id', authenticateAdmin, adminController.getRestaurant)
router.put('/admin/restaurants/:id', authenticateAdmin, upload.single('image'), adminController.putRestaurant)
router.delete('/admin/restaurants/:id', authenticateAdmin, adminController.deleteRestaurant)
router.get('/admin/restaurants', authenticateAdmin, adminController.getRestaurants)
router.post('/admin/restaurants', authenticateAdmin, upload.single('image'), adminController.postRestaurant)

router.put('/admin/users/:id', authenticateAdmin, adminController.putUser)
router.get('/admin/users', authenticateAdmin, adminController.getUsers)

router.get('/admin/categories/:id', authenticateAdmin, categoryController.getCategories)
router.put('/admin/categories/:id', authenticateAdmin, categoryController.putCategory)
router.delete('/admin/categories/:id', authenticateAdmin, categoryController.deleteCategory)
router.get('/admin/categories', authenticateAdmin, categoryController.getCategories)
router.post('/admin/categories', authenticateAdmin, categoryController.postCategory)

router.get('/admin', authenticateAdmin, (req, res) => res.redirect('admin/restaurants'))

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logOut)

router.post('/favorite/:restaurantId', authenticate, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticate, userController.removeFavorite)

router.post('/like/:restaurantId', authenticate, userController.addLike)
router.delete('/like/:restaurantId', authenticate, userController.removeLike)

router.get('/users/top', authenticate, userController.getTopUser)

router.post('/following/:userId', authenticate, userController.addFollowing)
router.delete('/following/:userId', authenticate, userController.removeFollowing)

module.exports = router