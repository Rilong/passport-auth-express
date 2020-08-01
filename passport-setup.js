const LocalStrategy = require('passport-local').Strategy

const User = require('./models/User')

function passportSetup(passport) {
  passport.use(
    'local',
    new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
      try {
        const user = await User.findOne({email})
        if (!user) {
          return done(null, false, {message: 'The user credentials are invalid'})
        }
        if (!await user.verifyPassword(password)) {
          return done(null, false, {message: 'The user credentials are invalid'})
        }
        return done(null, user)
      } catch (e) {
        return done(e)
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (e) {
      done(e)
    }
  })
}

module.exports = {
  passportSetup
}