import { Book, CreateBookRequest, UpdateBookRequest } from '../types/book.types';
import prisma from '../config/prisma';

export async function getAllBooks(): Promise<Book[]> {
	return prisma.book.findMany({
		include: { user: true },
		orderBy: { id: 'asc' },
	});
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
			],
		},
		include: {
			user: true
		}
	});
}

export async function getBookById(id: number): Promise<Book> {
	const book = await prisma.book.findUnique({
		where: { id: id },
		include: { user: true }
	});
	if (!book) {
		const error = new Error('Libro no encontrado') as any;
		error.statusCode = 404;
        throw error;
	}
	return book;
}

export async function createBook(data: CreateBookRequest): Promise<Book> {
	const userExists = await prisma.user.findUnique({
		where: { id: data.userId }
	});
	if (!userExists) {
		const error = new Error('El usuario no existe') as any;
		error.statusCode = 404;
        throw error;
	}
	return prisma.book.create({
		data: {
			imagen: data.imagen,
			titulo: data.titulo,
			autor: data.autor,
			categoria: data.categoria,
			destacado: data.destacado,
			userId: data.userId
		},
		include: { user: true }
	});
}

import { Book, UpdateBookRequest } from '../types/book.types';
import prisma from '../config/prisma';

export async function updateBook(id: number, updateData: UpdateBookRequest): Promise<Book> {
	// Verificar si se intenta actualizar el userId y si existe
	if (updateData.userId) {
		const userExists = await prisma.user.findUnique({
			where: { id: updateData.userId }
		});
		if (!userExists) {
			const error = new Error('El usuario no existe' ) as any;
            error.statusCode = 404;
            throw error;
		}
	}
	try {
		return await prisma.book.update({
			where: { id },
			data: {
				...(updateData.imagen !== undefined ? { imagen: updateData.imagen } : {}),
				...(updateData.titulo !== undefined ? { titulo: updateData.titulo } : {}),
				...(updateData.autor !== undefined ? { autor: updateData.autor } : {}),
				...(updateData.categoria !== undefined ? { categoria: updateData.categoria } : {}),
				...(updateData.destacado !== undefined ? { destacado: updateData.destacado } : {}),
				...(updateData.userId !== undefined ? { userId: updateData.userId } : {}),
			},
			include: { user: true }
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Libro no encontrado' ) as any;
            error.statusCode = 404;
            throw error;
		}
		throw e;
	}
}

export async function deleteBook(id: number): Promise<void> {
	try {
		await prisma.book.delete({
			where: { id }
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Libro no encontrado' ) as any;
            error.statusCode = 404;
            throw error;
		}
		throw e;
	}
}


