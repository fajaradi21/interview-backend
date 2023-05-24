const { response } = require("express")
const { StatusCodes } = require("http-status-codes")

const myHeaders = new Headers()
myHeaders.append("Accept", "application/vnd.Creative Force.v2.1+json")
myHeaders.append(
  "x-api-key",
  "DN9228Ry-raKFqc1o6ua4kB3jz0qKbJBl5hsyCYWUs1HiNQnk8xxBz2ARKGj3M6Hgpxi3"
)
myHeaders.append("x-api-language", "en_GB")

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
}

const module1 = async (req, res, next) => {
  try {
    const result = await fetch("https://api.cr4ce.com/user", requestOptions)
    const data = await result.json()
    return res.status(StatusCodes.OK).json({ data })
  } catch (error) {
    console.log("error", error)
    next(error)
  }
}

module.exports = { module1 }
