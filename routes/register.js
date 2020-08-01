const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const {validationResult} = require('express-validator/check')
const registerValidators = require('../validators/register')
const router = Router()
const notAuthenticated = require('../middleware/notAuthenticated')


const registerVars = (req, res) => ({
  title: 'Register Page',
  isRegister: true,
  isAuthenticated: req.isAuthenticated()
})

router.get('/', notAuthenticated, (req, res) => {
  res.render('register', registerVars(req, res))
})

router.post('/', [notAuthenticated, ...registerValidators], async (req, res) => {
  const {email, name, password} = req.body

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).render('register', {
      ...registerVars(req, res),
      error: errors.array()[0].msg,
      form: {email, name}
    })
  }

  console.log('Data is valid')

  const encryptedPassword = await bcrypt.hash(password.trim(), 10)
  const newUser = new User({
    email, name, password: encryptedPassword
  })

  await newUser.save()
  req.flash('success', 'User registered')
  res.redirect('/login')
})

module.exports = router