import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string()
    .email('Formato de email inválido')
    .toLowerCase()
    .trim(),
    password: z.string()
    .min(9, 'La contraseña debe tener al menos 9 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
    name: z.string()
    .min(1, 'El nombre es requerido')
    .max(150, 'El nombre no puede exceder los 150 caracteres')
    .trim(),
    role: z.enum(['USER','ADMIN']).optional().default('USER')
});

export const updateUserSchema = createUserSchema.partial();