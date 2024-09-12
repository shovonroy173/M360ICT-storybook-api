import { Request, Response, NextFunction } from 'express'
import knex from '../db/db'

// Get all books or filter by author ID (e.g., /books?author=6)
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { author } = req.query
  try {
    let query = knex('books').select('*')
    
    if (author) {
      query = query.where({ author_id: author })
    }
    
    const books = await query
    res.status(200).json(books)
  } catch (error) {
    next(error)
  }
}

// Get a single book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const book = await knex('books').where({ id }).first()
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}

// Create a new book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, published_date, author_id } = req.body
    const [newBook] = await knex('books').insert({ title, description, published_date, author_id }).returning('*')
    res.status(201).json({ message: 'Book created successfully', newBook })
  } catch (error) {
    next(error)
  }
}

// Update an existing book by ID
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { title, description, published_date, author_id } = req.body
  try {
    const updatedBook = await knex('books')
      .where({ id })
      .update({ title, description, published_date, author_id })
      .returning('*')

    if (!updatedBook.length) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json({ message: 'Book updated successfully', updatedBook })
  } catch (error) {
    next(error)
  }
}

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const deletedRows = await knex('books').where({ id }).del()
    if (!deletedRows) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    next(error)
  }
}

//  A Detailed View of a Book with Author Information
export const getSingleBookWithAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const book = await knex('books')
      .select('books.id', 'books.title', 'books.description', 'authors.id as author_id', 'authors.name as author_name', 'authors.bio')
      .leftJoin('authors', 'books.author_id', 'authors.id')
      .where('books.id', id)
      .first();

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const result = {
      id: book.id,
      title: book.title,
      description: book.description,
      author: {
        id: book.author_id,
        name: book.author_name,
        bio: book.bio,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
