import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/loginSchema";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError
	} = useForm({
		resolver: yupResolver(loginSchema)
	});

	async function onSubmit(data) {
		try {
			// llama funcion login del authContext con email y password
			const result = await login(data.email, data.password); // usa la función login del contexto

			if (!result.success) {
				let errorMessage = result.error || "Credenciales inválidas";

				if (result.error === 'SERVICE_UNAVAILABLE') { //nuevo msj de error
					errorMessage = "El servicio de inicio de sesión no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.";
				}
				setError("root", {
					type: "manual",
					message: errorMessage
				});
				return;
			}
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err);
			setError("root", {
				type: "manual",
				message: err.message || "Ocurrió un error inesperado."
			});
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="login-form">
			<h2>Login</h2>
			<div className="form-group">
				<input
					{...register("email")}
					placeholder="Email"
					className={errors.email ? "input-error" : ""}
				/>
				{errors.email && (
					<span className="field-error">{errors.email.message}</span>
				)}
			</div>
			<div className="form-group">
				<input
					{...register("password")}
					type="password"
					placeholder="Password"
					className={errors.password ? "input-error" : ""}
				/>
				{errors.password && (
					<span className="field-error">{errors.password.message}</span>
				)}
			</div>
			{errors.root && (
				<p style={{ color: 'red', marginBottom: '15px', fontWeight: '500' }}>{errors.root.message}</p>
			)}
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Ingresando..." : "Ingresar"}
			</button>
		</form>
	);
}