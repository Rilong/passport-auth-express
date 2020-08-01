const bcrypt = require('bcrypt')
const {Schema, model} = require('mongoose')

const user = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

user.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('User', user)