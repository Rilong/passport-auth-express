const {body} = require('express-validator/check')
const User = require('../models/User')

module.exports = [
  body('email', 'This email is required').trim().not().isEmpty(),
  body('email', 'This email is incorrect').isEmail(),
  body('email').custom(async (value, {req}) => {
    try {
      const candidate = await User.findOne({email: value})
      if (candidate) {
        return Promise.reject('The email is already exists')
      }
    } catch (e) {
      console.log(e)
    }
  }),
  body('name', 'This name is required').trim().not().isEmpty(),
  body('password', 'This password is required').not().isEmpty(),
  body('password', 'The password length must be 6 chars and more').isLength({min: 6}),
  body('passwordConfirm').custom((value, {req}) => {
    console.log(value, req.body.password)
    if(value !== req.body.password) {
      throw new Error('The passwords do not confirm')
    }
    return true
  })
]
