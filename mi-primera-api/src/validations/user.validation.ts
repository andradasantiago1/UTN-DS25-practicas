import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string()
    .email('Formato de email inválido'),
    password: z.string()
    .min(9, 'La contraseña debe tener al menos 9 caracteres'),
    name: z.string()
    .min(1, 'El nombre es requerido')
    .max(150, 'El nombre no puede exceder los 150 caracteres')
    .trim(),
});

export const updateUserSchema = createUserSchema.partial();