import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';

const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/search', bookController.findBooks);
router.post('/', validate(createBookSchema), bookController.createBook);
router.put('/:id', validate(updateBookSchema), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export const bookRoutes = router;