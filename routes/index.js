const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const userController = require('../controllers/userController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

module.exports = (app, passport) => {
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

  app.get('/restaurants', authenticate, restController.getRestaurants)
  app.get('/', authenticate, (req, res) => res.redirect('/restaurants'))

  app.get('/admin/restaurants/create', authenticateAdmin, adminController.createRestaurant)
  app.get('/admin/restaurants/:id/edit', authenticateAdmin, adminController.editRestaurant)
  app.get('/admin/restaurants/:id', authenticateAdmin, adminController.getRestaurant)
  app.put('/admin/restaurants/:id', authenticateAdmin, upload.single('image'), adminController.putRestaurant)
  app.delete('/admin/restaurants/:id', authenticateAdmin, adminController.deleteRestaurant)
  app.get('/admin/restaurants', authenticateAdmin, adminController.getRestaurants)
  app.post('/admin/restaurants', authenticateAdmin, upload.single('image'), adminController.postRestaurant)

  app.get('/admin/users', authenticateAdmin, adminController.getUsers)
  app.put('/admin/users/:id', authenticateAdmin, adminController.putUser)

  app.get('/admin/categories', authenticateAdmin, categoryController.getCategories)
  app.post('/admin/categories', authenticateAdmin, categoryController.postCategory)
  app.get('/admin/categories/:id', authenticateAdmin, categoryController.getCategories)
  app.put('/admin/categories/:id', authenticateAdmin, categoryController.putCategory)
  app.delete('/admin/categories/:id', authenticateAdmin, categoryController.deleteCategory)

  app.get('/admin', authenticateAdmin, (req, res) => res.redirect('admin/restaurants'))

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logOut)
}