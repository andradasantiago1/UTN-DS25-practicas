
export interface Book {
	id: number;
	imagen: string;
	titulo: string;
	autor: string;
	categoria: string;
	destacado: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CreateBookRequest {
	imagen: string;
	titulo: string;
	autor: string;
	categoria: string;
	destacado: boolean;
}

export interface UpdateBookRequest {
	imagen?: string;
	titulo?: string;
	autor?: string;
	categoria?: string;
	destacado?: boolean;
}

export interface BookResponse {
	book: Book;
	message: string;
}

export interface BooksListResponse {
	books: Book[];
	total: number;
}
