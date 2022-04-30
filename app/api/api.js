const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

router.get("/books", async (req, res) => {
    try {
        const books = await Book.findAll()
        res.json({
            status: true,
            message: "Get all books successfully",
            data: books
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
        console.log(e)
    }
})

module.exports = router