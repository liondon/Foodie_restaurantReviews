const db = require('../models')
const Restaurant = db.Restaurant

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

  postRestaurant: (req, res) => {
    const { name, tel, addr, open_hours, desc } = req.body
    // Empty field check could be done by Bootstrap
    if (!name) {
      req.flash('error_msg', 'Name is required!')
      return res.redirect('back')
    }
    Restaurant.create({
      name,
      tel,
      addr,
      open_hours,
      desc
    })
      .then(restaurant => {
        req.flash('success_msg', `${restaurant.name} created!`)
        return res.redirect('/admin/restaurants')
      })
      .catch(err => console.log(err))
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

  putRestaurant: (req, res) => {
    const { name, tel, addr, open_hours, desc } = req.body
    Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        return restaurant.update({
          name,
          tel,
          addr,
          open_hours,
          desc
        })
      })
      .then(restaurant => {
        req.flash('success_msg', `${restaurant.name} updated!`)
        return res.redirect(`/admin/restaurants/${req.params.id}`)
      })
      .catch(err => console.log(err))
  }
}

module.exports = adminController