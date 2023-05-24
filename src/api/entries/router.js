const express = require("express")
const router = express.Router()
const { index, create, find, destroy } = require("./controller")
const { authenticateUser, authorizeRoles } = require("../../middleware/auth")

router.get("/", index)
router.post("/", authenticateUser, create)
router.post("/:id", authenticateUser, find)
router.delete("/:id", authenticateUser, authorizeRoles("admin"), destroy)

module.exports = router
