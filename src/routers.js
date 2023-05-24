const express = require("express")
const routers = express.Router()

const userRouter = require("./api/users/router")
const interviewRouter = require("./api/interviews/router")
const authRouter = require("./api/auth/router")
const entriesRouter = require("./api/entries/router")
const awardFroceRouter = require("./api/awardForce/router")

routers.use("/users", userRouter)
routers.use("/interview", interviewRouter)
routers.use("/auth", authRouter)
routers.use("/entries", entriesRouter)
routers.use("/awardforce", awardFroceRouter)

module.exports = routers
