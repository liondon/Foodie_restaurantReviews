const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engin', 'hbs')

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen('3000', () => {
  console.log(`Express server is running on http://localhost:3000`)
})