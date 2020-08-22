const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

// 引入 multer 並設定上傳資料夾 
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const adminController = require('../controllers/api/adminController')
const userController = require('../controllers/api/userController.js')

const authenticate = passport.authenticate('jwt', { session: false })

const authenticateAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) { return next() }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

router.get('/admin/restaurants', authenticate, authenticateAdmin, adminController.getRestaurants)
router.delete('/admin/restaurants/:id', authenticate, authenticateAdmin, adminController.deleteRestaurant)
router.post('/admin/restaurants', authenticate, authenticateAdmin, upload.single('image'), adminController.postRestaurant)

// JWT signin
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

module.exports = router