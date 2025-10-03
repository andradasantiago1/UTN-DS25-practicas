import { User } from './user.types';
import { Categoria } from './category.types';

export interface Book {
	id: number;
	imagen: string;
	titulo: string;
	autor: string;
	categoria: Categoria;
	destacado: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	userId?: number;
	user?: User;
}

export interface CreateBookRequest {
	imagen: string;
	titulo: string;
	autor: string;
	categoria: Categoria;
	destacado: boolean;
	userId: number;
}

export interface UpdateBookRequest {
	imagen?: string;
	titulo?: string;
	autor?: string;
	categoria?: Categoria;
	destacado?: boolean;
	userId?: number;
}

export interface BookResponse {
	book: Book;
	message: string;
}

export interface BooksListResponse {
	books: Book[];
	total: number;
}
