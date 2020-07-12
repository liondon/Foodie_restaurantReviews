const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const passport = require('./config/passport')

const db = require('./models')

const app = express()
const port = process.env.PORT || 3000

// setup handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setup bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// setup session
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

// setup flash, and put req.flash into res.locals
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.user = req.user
  next()
})

app.use(methodOverride('_method'))

app.use('/upload', express.static(__dirname + '/upload'))

// listen to port
app.listen(port, () => {
  // db.sequelize.sync()
  console.log(`Express server is running on http://localhost:${port}`)
})

require('./routes')(app, passport)