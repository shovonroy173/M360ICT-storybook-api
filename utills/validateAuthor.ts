import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

// Validation middleware
export const validateAuthor = [
  body('name').isString().notEmpty().withMessage('Name must be a non-empty string'),
  body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]
