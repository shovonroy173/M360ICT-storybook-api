import { Request, Response, NextFunction } from 'express'
import knex from '../db/db'


interface CustomRequest extends Request {
    user?: any ;
  }


// Get all authors
export const getAuthors = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authors = await knex('authors').select('*')
    res.status(200).json(authors)
  } catch (error) {
    next(error)
  }
}

// Get a single author by ID
export const getAuthorById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const author = await knex('authors').where({ id }).first()
    if (!author) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.status(200).json(author)
  } catch (error) {
    next(error)
  }
}

// Create a new author
export const createAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { name, bio, birthdate } = req.body
    const newAuthor = await knex('authors').insert({ name, bio, birthdate }).returning('*')
    res.status(201).json({ message: 'Author created successfully', newAuthor })
  } catch (error) {
    next(error)
  }
}

// Update an existing author by ID
export const updateAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, bio, birthdate } = req.body
  try {
    const updatedAuthor = await knex('authors').where({ id }).update({ name, bio, birthdate }).returning('*')
    if (!updatedAuthor.length) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.status(200).json({ message: 'Author updated successfully', updatedAuthor })
  } catch (error) {
    next(error)
  }
}

// Delete an author by ID
export const deleteAuthor = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const deletedRows = await knex('authors').where({ id }).del()
    if (!deletedRows) {
      return res.status(404).json({ message: 'Author not found' })
    }
    res.status(200).json({ message: 'Author deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// A list of authors along with their respective books
export const getAllAuthorsWithBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await knex('authors')
      .select('authors.id', 'authors.name', 'books.id as book_id', 'books.title as book_title')
      .leftJoin('books', 'authors.id', 'books.author_id');

    // Transforming the result to group books under authors
    const result = authors.reduce((acc: any[], row: any) => {
      const authorIndex = acc.findIndex((author) => author.id === row.id);
      if (authorIndex !== -1) {
        acc[authorIndex].books.push({ id: row.book_id, title: row.book_title });
      } else {
        acc.push({
          id: row.id,
          name: row.name,
          books: row.book_id ? [{ id: row.book_id, title: row.book_title }] : [],
        });
      }
      return acc;
    }, []);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// A detailed view of an author with a list of their books
export const getSingleAuthorWithBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const author = await knex('authors')
      .select('authors.id', 'authors.name', 'authors.bio', 'books.id as book_id', 'books.title as book_title')
      .leftJoin('books', 'authors.id', 'books.author_id')
      .where('authors.id', id);

    if (author.length === 0) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const result = {
      id: author[0].id,
      name: author[0].name,
      bio: author[0].bio,
      books: author.filter((row) => row.book_id).map((book) => ({ id: book.book_id, title: book.book_title })),
    };

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};




