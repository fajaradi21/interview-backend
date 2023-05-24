const jwt = require("jsonwebtoken")

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

const generateToken = (payload) => {
  const result = {
    id: payload.id,
    email: payload.email,
    timeZone: payload.timeZone,
    country: payload.country,
    roles: payload.role,
  }
  return jwt.sign(result, process.env.JWT_SECRET, {
    expiresIn: "20d",
  })
}

function genToken(id, email, roles) {
  const payload = {
    id: id,
    email: email,
    roles: roles,
  }

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
    expiresIn: "15s",
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "1y",
  })

  return {
    accessToken,
    refreshToken,
  }
}

module.exports = {
  isTokenValid,
  generateToken,
  genToken,
}
