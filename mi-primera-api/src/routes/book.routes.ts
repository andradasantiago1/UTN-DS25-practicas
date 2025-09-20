import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { validate } from '../middlewares/validation.middleware';
import { createBookSchema, updateBookSchema } from '../validations/book.validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', 
    authenticate,
    authorize('ADMIN','USER')
    , bookController.getAllBooks);
router.get('/:id',
    authenticate,
    authorize('ADMIN', 'USER'), 
    bookController.getBookById);
router.get('/search',
    authenticate,
    authorize('ADMIN', 'USER'),
    bookController.findBooks);
router.post('/',
    authenticate,
    authorize('ADMIN', 'USER'),
    validate(createBookSchema), bookController.createBook);
router.put('/:id',
    authenticate,
    authorize('ADMIN', 'USER'),
    validate(updateBookSchema), bookController.updateBook);
router.delete('/:id',
    authenticate,
    authorize('ADMIN'),
    bookController.deleteBook);

export const bookRoutes = router;