const express = require("express")
const router = express.Router()

const { module1 } = require("./controller")

router.get("/fetch-user", module1)

module.exports = router
