const {Router} = require('express')
const router = Router()
const authenticated = require('../middleware/authenticated')

router.get('/', authenticated, (req, res) => {
  const {email, name} = req.user
  res.render('profile', {
    title: 'Profile Page',
    email,
    name,
    isProfile: true,
    isAuthenticated: req.isAuthenticated()
  })
})

module.exports = router