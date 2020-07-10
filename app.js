const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const db = require('./models')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.listen('3000', () => {
  db.sequelize.sync()
  console.log(`Express server is running on http://localhost:3000`)
})

require('./routes')(app)