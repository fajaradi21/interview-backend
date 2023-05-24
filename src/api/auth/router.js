const express = require("express")
const router = express.Router()
const { login, register } = require("./controller")

router.get("/", (req, res) => {
  res.send("this is auth service")
})
router.post("/register", register)
router.post("/login", login)

module.exports = router
