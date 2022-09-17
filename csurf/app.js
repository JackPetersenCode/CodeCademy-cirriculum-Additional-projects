var cookieParser = require('cookie-parser')
var csurf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')

// setup route middlewares
const csrfProtection = csurf({
  cookie: {
    maxAge: 300000000,
    secure: true,
    sameSite: 'none'
  }
});

var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()

/*const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cors(corsOptions));*/

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({csrfToken: req.csrfToken() })
})

app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
})

module.exports = app;