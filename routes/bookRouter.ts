import express from 'express'
import { getBooks, getBookById, createBook, updateBook, deleteBook, getSingleBookWithAuthor} from '../controllers/bookController'

const router = express.Router()

router.get('/books', getBooks)               
router.get('/books/:id', getBookById)       
router.post('/', createBook)            
router.put('/books/:id', updateBook)        
router.delete('/books/:id', deleteBook)      
router.get('/getSingleBookWithAuthor/:id', getSingleBookWithAuthor)      

export default router
