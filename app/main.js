require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sync = require("./utils/sync")
const api = require("./api/api")

const PORT = 3000

sync()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", api)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})