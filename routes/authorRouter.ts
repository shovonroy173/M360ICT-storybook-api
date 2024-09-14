import express from 'express'
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthorsWithBooks, 
  getSingleAuthorWithBooks 
} from '../controllers/authorController'

import { validateAuthor } from '../utills/validateAuthor';

const router = express.Router();

router.get('/authors', getAuthors)
router.get('/authors/:id',  getAuthorById)
router.post('/author',  validateAuthor, createAuthor)

router.put('/authors/:id', validateAuthor,   updateAuthor)
router.delete('/authors/:id',  deleteAuthor)
router.get('/allAuthorsWithBooks',  getAllAuthorsWithBooks)
router.get('/singleAuthorWithBooks/:id',  getSingleAuthorWithBooks)



export default router
