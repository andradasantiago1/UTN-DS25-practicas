import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setToken } from "../helpers/auth";
import { loginSchema } from "../validations/loginSchema";

export default function LoginPage() {
	const navigate = useNavigate();
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
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			if (!res.ok) throw new Error("Error en login");
			const { data: responseData } = await res.json();
			setToken(responseData.token);
			navigate("/catalog");
		} catch (err) {
			console.log(err);
			setError("root", {
				type: "manual",
				message: "Credenciales inválidas"
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
			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Ingresando..." : "Ingresar"}
			</button>
		</form>
	);
}