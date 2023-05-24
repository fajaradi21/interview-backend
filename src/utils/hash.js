const bycrypt = require("bcrypt")

async function hashPasswords(password) {
  try {
    const salt = await bycrypt.genSalt(10)
    const result = await bycrypt.hash(password, salt)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = { hashPasswords }
