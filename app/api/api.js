const express = require("express")
const { route } = require("express/lib/application")
const router = express.Router()
const Book = require("../models/Book")

// * Get All book
router.get("/books", async (_, res) => {
    try {
        await Book.findAll({
            order: [
                ["id", "ASC"]
            ]
        }).then((books) => res.status(200).json({
            status: true,
            message: "Get all books successfully",
            data: books
        }))
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

// * Insert book
router.post("/books", async (req, res) => {
    try {
        await Book.create(
            req.body
        ).then((book) => res.status(201).json({
            status: true,
            message: "Insert book successfully",
            data: book
        }))

    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

router.patch("/books/:bookId", async (req, res) => {
    try {
        const selectedId = await Book.findByPk(req.params.bookId)
        selectedId.set({ ...req.body }).save().then((book) => res.status(200).json({
            status: true,
            message: "Update book successfuly",
            data: book
        }))
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }
})

router.delete("/books/:bookId", async (req, res) => {
    try {
        const selectedId = await Book.findByPk(req.params.bookId)
        selectedId.destroy().then((book) => res.status(200).json({
            status: true,
            message: "Delete book successfully",
            data: book
        }))
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e,
            data: null
        })
    }

})

module.exports = router