import { z } from 'zod';

export enum Categoria {
    FANTASIA = 'FANTASIA',
    NOVELA = 'NOVELA',
    CIENCIA_FICCION = 'CIENCIA FICCION',
    HISTORIA = 'HISTORIA',
}

export const createBookSchema = z.object({
    imagen: z.string()
    .url()
    .optional(), 
    titulo: z.string()
    .min(1,'El titulo es requerido')
    .max(150, 'El título no puede exceder 150 caracteres')
    .trim(),
    autor: z.string()
    .min(1,'El autor es requerido'),
    categoria: z.nativeEnum(Categoria), 
    destacado: z.boolean()
    .default(false)
    .optional(), 
    userId: z.number()
    .int('El ID del usuario debe ser un numero entero')
    .positive('ID de usuario debe ser positivo')
    .optional(), 
});

export const updateBookSchema = createBookSchema.partial();

