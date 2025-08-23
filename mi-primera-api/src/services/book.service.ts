// src/services/book.service.ts

import { Book, CreateBookRequest, UpdateBookRequest } from '../types/book.types';
import prisma from '../config/prisma';

export async function getAllBooks(): Promise<Book[]> {
    const books = await prisma.book.findMany({
    orderBy: { id: 'asc' },
    });
    return books;
}

export async function findBooks(filters: any): Promise<Book[]> {
	if (!filters.query) {
		return [];
	}
	return prisma.book.findMany({
		where: {
			OR: [
				{ titulo: { contains: filters.query as string, mode: 'insensitive' } },
				{ autor: { contains: filters.query as string, mode: 'insensitive' } },
				{ categoria: { contains: filters.query as string, mode: 'insensitive' } },
			]
		}
	});
}

export async function getBookById(id: number): Promise<Book> {
	const book = await prisma.book.findUnique({
		where: { id: id },
	});
	if (!book) {
		const error = new Error('Book not found');
		(error as any).statusCode = 404;
		throw error;
	}
	return book;
}

export async function createBook(data: CreateBookRequest): Promise<Book> {
    const created = await prisma.book.create({
    data: {
        imagen: data.imagen,
        titulo: data.titulo,
        autor: data.autor,
        categoria: data.categoria,
        destacado: data.destacado
    },
    });
    return created;
}

export async function updateBook(id: number, updateData: UpdateBookRequest): Promise<Book> {
    try {
        const updated = await prisma.book.update({
        where: { id },
        data: {
            ...(updateData.imagen !== undefined ? { imagen: updateData.imagen } : {}),
            ...(updateData.titulo !== undefined ? { titulo: updateData.titulo } : {}),
            ...(updateData.autor !== undefined ? { autor: updateData.autor } : {}),
            ...(updateData.categoria !== undefined ? { categoria: updateData.categoria } : {}),
            ...(updateData.destacado !== undefined ? { destacado: updateData.destacado } : {}),
    },
});
    return updated;
    } catch (e: any) {
    if (e.code === 'P2025') {
        const error = new Error('Book not found');
        (error as any).statusCode = 404;
        throw error;
    }
    throw e;
    }
}

export async function deleteBook(id: number): Promise<void> {
    const book = await prisma.book.delete({
        where: { id }
    });
    if (!book) {
        const error = new Error('Book not found');
        (error as any).statusCode = 404;
        throw error;
    }
}


