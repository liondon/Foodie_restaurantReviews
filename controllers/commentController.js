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
  },
  deleteComment: (req, res) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        comment.destroy()
        res.redirect(`/restaurants/${comment.RestaurantId}`)
      })
      .catch(err => console.log(err))
  }
}

module.exports = commentController