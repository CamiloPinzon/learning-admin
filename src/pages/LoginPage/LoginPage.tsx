import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import {
	loginStart,
	loginSuccess,
	loginFailure,
	clearError,
} from "../../store/slices/authSlice";
import { authService } from "../../services/authService";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		dispatch(clearError());
	}, [dispatch]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			dispatch(loginFailure("Por favor, completa todos los campos"));
			return;
		}

		dispatch(loginStart());

		try {
			const response = await authService.login({ email, password });
			dispatch(loginSuccess(response));
			navigate("/dashboard");
		} catch (error) {
			dispatch(
				loginFailure(
					error instanceof Error ? error.message : "Error de autenticación"
				)
			);
		}
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.loginContainer}>
				<div className={styles.loginHeader}>
					<div className={styles.logo}>
						<span className={styles.logoIcon}>🎓</span>
						<h1>Plataforma de Aprendizaje</h1>
					</div>
					<p className={styles.subtitle}>Panel de Administración</p>
				</div>

				<form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
					<div className={styles.formGroup}>
						<label htmlFor="email" className={styles.label}>
							Correo Electrónico
						</label>
						<input
							type="email"
							id="email"
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="tu@email.com"
							required
							aria-describedby={error ? "error-message" : undefined}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password" className={styles.label}>
							Contraseña
						</label>
						<div className={styles.passwordContainer}>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								className={styles.input}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Tu contraseña"
								required
								aria-describedby={error ? "error-message" : undefined}
							/>
							<button
								type="button"
								className={styles.passwordToggle}
								onClick={() => setShowPassword(!showPassword)}
								aria-label={
									showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
								}
							>
								{showPassword ? "👁️" : "👁️‍🗨️"}
							</button>
						</div>
					</div>

					{error && (
						<div
							className={styles.errorMessage}
							id="error-message"
							role="alert"
						>
							{error}
						</div>
					)}

					<button
						type="submit"
						className={styles.submitButton}
						disabled={loading}
						aria-describedby={loading ? "loading-message" : undefined}
					>
						{loading ? (
							<>
								<span className={styles.spinner} aria-hidden="true"></span>
								Iniciando sesión...
							</>
						) : (
							"Iniciar Sesión"
						)}
					</button>
				</form>

				<div className={styles.demoCredentials}>
					<h3>Credenciales de prueba:</h3>
					<div className={styles.credentialItem}>
						<strong>Administrador:</strong>
						<br />
						Email: admin@plataforma.com
						<br />
						Contraseña: admin123
					</div>
					<div className={styles.credentialItem}>
						<strong>Instructor:</strong>
						<br />
						Email: instructor@plataforma.com
						<br />
						Contraseña: instructor123
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
