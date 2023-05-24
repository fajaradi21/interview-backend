const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
const bycrypt = require("bcrypt")
const db = require("../../database/models")
const { hashPasswords } = require("../../utils/hash")

const User = db.users

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, timeZone, country } = req.body
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" })
    }

    const hashPassword = await hashPasswords(password)
    const data = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
      timeZone: timeZone,
      country: country,
      roles: "user",
    })

    res.status(StatusCodes.CREATED).json({
      msg: "User created",
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Email not found" })
    }

    const isPasswordValid = bycrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid password" })
    }

    const result = {
      id: user.id,
      email: user.email,
      timeZone: user.timeZone,
      country: user.country,
      roles: user.roles,
    }
    const token = jwt.sign(result, process.env.JWT_SECRET, {
      expiresIn: "20d",
    })

    res.status(StatusCodes.OK).json({ token, description: user.description })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = { login, register }
