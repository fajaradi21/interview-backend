const express = require("express")
const app = express()
const server = require("http").createServer(app)

require("dotenv").config()
const PORT = process.env.PORT

const routers = require("./src/routers")

app.use(express.urlencoded({ limit: "50mb", extended: false }))
app.use(express.json({ limit: "50mb" }))
app.use("/api", routers)

server.listen(PORT, () => {
  console.log(`Service run on port ${PORT}`)
})
