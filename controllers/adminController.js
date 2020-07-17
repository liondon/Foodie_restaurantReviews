const db = require('../models')
const Restaurant = db.Restaurant
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = '405c47ad172f332'

const adminController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ raw: true })
      .then(restaurants => {
        return res.render('admin/restaurants', { restaurants })
      })
      .catch(err => console.log(err))
  },

  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },

  postRestaurant: async (req, res) => {
    const { name, tel, addr, open_hours, desc } = req.body
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        Restaurant.create({
          name,
          tel,
          addr,
          open_hours,
          desc,
          image: file ? img.data.link : null
        })
          .then(restaurant => {
            req.flash('success_msg', `${restaurant.name} created!`)
            return res.redirect('/admin/restaurants')
          })
          .catch(err => console.log(err))
      })
    }
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        return res.render('admin/restaurant', { restaurant })
      })
      .catch(err => console.log(err))
  },

  editRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id, { raw: true })
      .then(restaurant => {
        return res.render('admin/create', { restaurant })
      })
      .catch(err => console.log(err))
  },

  putRestaurant: async (req, res) => {
    const { name, tel, addr, open_hours, desc } = req.body
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        Restaurant.findByPk(req.params.id)
          .then(restaurant => {
            return restaurant.update({
              name,
              tel,
              addr,
              open_hours,
              desc,
              image: file ? img.data.link : restaurant.image
            })
          })
          .then(restaurant => {
            req.flash('success_msg', `${restaurant.name} updated!`)
            return res.redirect(`/admin/restaurants/${req.params.id}`)
          })
          .catch(err => console.log(err))
      })
    }
  },

  deleteRestaurant: (req, res) => {
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        restaurant.destroy()
        return res.redirect('/admin/restaurants')
      })
      .catch(err => console.log(err))
  }
}

module.exports = adminController