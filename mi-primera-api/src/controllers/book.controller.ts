import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
	try {
		const books = await bookService.getAllBooks();
		res.json({ success: true, data: books });
	} catch (error) {
		next(error);
	}
}

export async function findBooks(req: Request, res: Response, next: NextFunction) {
	try {
		const filters = req.query;
		const books = await bookService.findBooks(filters);
		res.json({ success: true, data: books });
	} catch (error) {
		next(error);
	}
}

export async function getBookById(req: Request, res: Response, next: NextFunction) {
	try {
		const id = parseInt(req.params.id);
		const book = await bookService.getBookById(id);
		res.json({ success: true, data: book });
	} catch (error) {
		next(error);
	}
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = (req as any).user?.id || (req as any).userId; 
		const bookData = { //agrego el userID del usuario que lo agrega 
			...req.body, 
			userId: Number(userId)
		};
		const newBook = await bookService.createBook(bookData);
		res.status(201).json({ success: true, message: 'Book created successfully', data: newBook });
	} catch (error) {
		next(error);
	}
}

export async function updateBook(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = parseInt(req.params.id);
		const updatedBook = await bookService.updateBook(id, req.body);
		res.json({ success: true, message: 'Book updated successfully', data: updatedBook });
	} catch (error) {
		next(error);
	}
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
	try {
		const id = parseInt(req.params.id);
		await bookService.deleteBook(id);
		res.json({ success: true, message: 'Book deleted successfully' });
	} catch (error) {
		next(error);
	}
}