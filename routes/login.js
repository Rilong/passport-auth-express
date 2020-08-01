const {Router} = require('express')
const passport = require('passport')
const router = Router()
const notAuthenticated = require('../middleware/notAuthenticated')

router.get('/', notAuthenticated, (req, res) => {
  res.render('login', {
    title: 'Login Page',
    success: req.flash('success'),
    error: req.flash('error')[0],
    isLogin: true,
    isAuthenticated: req.isAuthenticated()
  })
})

router.post('/', (req, res, next) => {
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      successRedirect: '/'
    })(req, res, next)
  }
)

module.exports = router