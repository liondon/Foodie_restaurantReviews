const db = require('../models')
const Comment = db.Comment

const commentController = {
  postComment: async (req, res) => {
    const { content, restaurantId } = req.body
    const comment = await Comment.create({
      content,
      RestaurantId: restaurantId,
      UserId: req.user.id  //req.user comes from 'passport'
    })
    return res.redirect(`/restaurants/${restaurantId}`)
  }
}

module.exports = commentController