require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sync = require("./utils/sync")
const api = require("./api/api")

sync()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", api)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})