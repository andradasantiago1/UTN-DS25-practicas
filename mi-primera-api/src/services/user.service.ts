import { User } from '../types/user.types';
import prisma from '../config/prisma';

export async function getAllUsers(): Promise<User[]> {
	return prisma.user.findMany({
		include: { books: true },
		orderBy: { id: 'asc' },
	});
}

export async function getUserById(id: number): Promise<User> {
	const user = await prisma.user.findUnique({
		where: { id },
		include: { books: true }
	});
	if (!user) {
		const error = new Error('Usuario no encontrado') as any;
		error.statusCode = 404;
		throw error;
	}
	return user;
}

export async function createUser(data: {
	email: string;
	password: string;
	name: string;
}): Promise<User> {
	const userExists = await prisma.user.findUnique({
		where: { email: data.email }
	});
	if (userExists) {
		const error = new Error('El email ya esta registrado') as any;
		error.statusCode = 409; //409 = conflicto 
		throw error;
	}
	return prisma.user.create({
		data,
		include: { books: true }
	});
}

export async function updateUser(id: number, updateData: Partial<User>): Promise<User> {
	if (updateData.email) {
		const userExists = await prisma.user.findUnique({
			where: { email: updateData.email }
		});
		if (userExists && userExists.id !== id) {
			const error = new Error('El email ya esta registrado') as any;
			error.statusCode = 409;
			throw error;
		}
	}
	try {
		return await prisma.user.update({
			where: { id },
			data: updateData,
			include: { books: true }
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Usuario no encontrado') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}

export async function deleteUser(id: number): Promise<void> {
	try {
		await prisma.user.delete({
			where: { id }
		});
	} catch (e: any) {
		if (e.code === 'P2025') {
			const error = new Error('Usuario no encontrado') as any;
			error.statusCode = 404;
			throw error;
		}
		throw e;
	}
}