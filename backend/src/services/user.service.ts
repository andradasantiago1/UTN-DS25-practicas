import { CreateUserRequest, UpdateUserRequest, User } from '../types/user.types';
import prisma from '../config/prisma';
import bcrypt from 'bcrypt';

export async function getAllUsers(limit: number = 10): Promise<UserData[]> {
	const users = await prisma.user.findMany({
	orderBy: { id: "asc" },
	take: limit,
	omit: { password: true }
	});
	return users;
}


export async function getUserById(id: number): Promise<User> {
	const user = await prisma.user.findUnique({
		where: { id }, 
		omit: { password: true },
		include: { books: true }
	});
	if (!user) {
		const error = new Error('Usuario no encontrado') as any;
		error.statusCode = 404;
		throw error;
	}
	return user;
}

export async function createUser(data: CreateUserRequest): Promise<User> {
	const userExists = await prisma.user.findUnique({
		where: { email: data.email }
	});
	if (userExists) {
		const error = new Error('El email ya esta registrado') as any;
		error.statusCode = 409; //409 = conflicto 
		throw error;
	}
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const user = await prisma.user.create({
	data: {
		...data,
		password: hashedPassword
	},
	omit: { password: true }
	});
	return user;
}


export async function updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    try {
        const updateData: Partial<UpdateUserRequest> = { ...data };
        if (data.password) { 
            updateData.password = await bcrypt.hash(data.password, 10);
        } else {
            delete (updateData as any).password;
        }
        return await prisma.user.update({
            where: { id },
            data: updateData,
            omit: { password: true } 
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