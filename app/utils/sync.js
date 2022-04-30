const db = require("../config/db")

module.exports = () => {
    db.sync()
}