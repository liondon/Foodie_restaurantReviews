const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: async (req, res) => {
    let categoryId = ''
    let whereQuery = {}
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }
    const restaurants = await Restaurant.findAll({
      where: whereQuery,
      include: [Category],
      raw: true,
      nest: true
    })
    const restData = restaurants.map(r => ({
      ...r,
      desc: r.desc.substring(0, 50)
    }))
    const categories = await Category.findAll({
      // include: [Restaurant],
      raw: true,
      nest: true
    })
    return res.render('restaurants', {
      restaurants: restData,
      categories,
      categoryId
    })
  },

  getRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [Category],
      raw: true,
      nest: true
    })
    return res.render('restaurant', { restaurant })
  },

}

module.exports = restController