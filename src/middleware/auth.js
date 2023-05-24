const { isTokenValid } = require("../utils/jwt")
const { StatusCodes } = require("http-status-codes")

const authenticateUser = (req, res, next) => {
  try {
    let token

    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]
    }

    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Authentication invalid" })
    }

    const payload = isTokenValid({ token })

    req.user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      timeZone: payload.timeZone,
      country: payload.country,
      roles: payload.roles,
    }
    next()
  } catch (error) {
    next(error)
  }
}

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Unauthorized to access this route" })
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizeRoles,
}
