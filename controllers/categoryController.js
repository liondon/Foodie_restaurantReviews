const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: async (req, res) => {
    const categories = await Category.findAll({ raw: true, nest: true })
    if (req.params.id) {
      const category = await Category.findByPk(req.params.id, { raw: true, nest: true })
      return res.render('admin/categories', { categories, category })
    }
    return res.render('admin/categories', { categories })
  },

  postCategory: async (req, res) => {
    const { name } = req.body
    Category.create({ name })
      .then(category => {
        req.flash('success_msg', `Category: ${category.name} created!`)
        return res.redirect('/admin/categories')
      })
      .catch(err => console.log(err))
  },

  putCategory: (req, res) => {
    const { name } = req.body
    let oldName = ''
    Category.findByPk(req.params.id)
      .then(category => {
        oldName = category.name
        return category.update({ name })
      })
      .then(category => {
        req.flash('success_msg', `${oldName} updated to ${category.name}!`)
        return res.redirect(`/admin/categories`)
      })
      .catch(err => console.log(err))
  },

  deleteCategory: (req, res) => {
    Category.findByPk(req.params.id)
      .then(category => {
        category.destroy()
        return res.redirect('/admin/categories')
      })
      .catch(err => console.log(err))
  }
}

module.exports = categoryController