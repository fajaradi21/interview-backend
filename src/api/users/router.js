const express = require("express")
const router = express.Router()
const { index, find, judgeDate, destroy } = require("./controller")
const { authenticateUser, authorizeRoles } = require("../../middleware/auth")

router.get("/", authenticateUser, authorizeRoles("admin"), index)
router.get("/:id", authenticateUser, authorizeRoles("admin"), find)
router.delete("/:id", authenticateUser, authorizeRoles("admin"), destroy)
router.post("/:id/date", authenticateUser, authorizeRoles("judge"), judgeDate)

module.exports = router
