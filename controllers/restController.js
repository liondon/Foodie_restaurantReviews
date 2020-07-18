const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const pageLimit = 9

const restController = {
  getRestaurants: async (req, res) => {
    const page = Number(req.query.page) || 1
    let offset = 0
    let categoryId = ''
    let whereQuery = {}
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }

    const restaurants = await Restaurant.findAndCountAll({
      include: [Category],
      where: whereQuery,
      offset, limit: pageLimit,
      raw: true, nest: true
    })

    const pageCount = Math.ceil(restaurants.count / pageLimit)
    const pageIndices = Array.from({ length: pageCount }).map((_, i) => i + 1)
    const prev = page - 1 < 1 ? 1 : page - 1
    const next = page + 1 > pageCount ? pageCount : page + 1

    const restData = restaurants.rows.map(r => ({
      ...r,
      desc: r.desc.substring(0, 50)
    }))
    const categories = await Category.findAll({
      // include: [Restaurant],
      raw: true, nest: true
    })
    return res.render('restaurants', {
      restaurants: restData,
      categories,
      categoryId,
      page, pageIndices, prev, next
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