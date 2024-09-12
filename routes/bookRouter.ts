import express from 'express'
import { getBooks, getBookById, createBook, updateBook, deleteBook, getSingleBookWithAuthor } from '../controllers/bookController'

const router = express.Router()

router.get('/books', getBooks)               // GET /books
router.get('/books/:id', getBookById)        // GET /books/:id
router.post('/', createBook)            // POST /books
router.put('/books/:id', updateBook)         // PUT /books/:id
router.delete('/books/:id', deleteBook)      // DELETE /books/:id
router.get('/getSingleBookWithAuthor/:id', getSingleBookWithAuthor)      // DELETE /books/:id

export default router
