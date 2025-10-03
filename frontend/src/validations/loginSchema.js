import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required('El email es requerido')
		.email('Debe ser un email válido'),
	password: yup
		.string()
		.required('La contraseña es requerida')
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
});
