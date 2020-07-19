const moment = require('moment')

module.exports = {
  ifEq: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  momentFromNow: function (a) {
    return moment(a).fromNow()
  }
}