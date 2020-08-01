const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')

const passport = require('passport')
const {passportSetup} = require('./passport-setup')

const homeRoutes = require('./routes/home')
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const profileRoutes = require('./routes/profile')

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passportSetup(passport)

app.use('/', homeRoutes)
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/profile', profileRoutes)
app.use('/logout', logoutRoutes)

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start() {
  try {
    await mongoose.connect('mongodb://root:123@mongo:27017/loginapp?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(port, () => console.log('The server has been started on port ' + port))
  } catch (e) {
    console.log(e)
  }
}

start()
