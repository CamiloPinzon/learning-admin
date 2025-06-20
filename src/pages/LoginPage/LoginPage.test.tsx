import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "./LoginPage";
import authReducer from "@/store/slices/authSlice";

jest.mock("@/services/authService", () => ({
	authService: {
		login: jest.fn(),
	},
}));

const createMockStore = (initialState = {}) => {
	return configureStore({
		reducer: {
			auth: authReducer,
		},
		preloadedState: {
			auth: {
				isAuthenticated: false,
				user: null,
				loading: false,
				error: null,
				...initialState,
			},
		},
	});
};

const renderWithProviders = (
	component: React.ReactElement,
	initialState = {}
) => {
	const store = createMockStore(initialState);
	return render(
		<Provider store={store}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};

describe("LoginPage", () => {
	test("renders login form", () => {
		renderWithProviders(<LoginPage />);

		expect(screen.getByText("Plataforma de Aprendizaje")).toBeInTheDocument();
		expect(screen.getByText("Panel de Administración")).toBeInTheDocument();
		expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /iniciar sesión/i })
		).toBeInTheDocument();
	});

	test("renders demo credentials", () => {
		renderWithProviders(<LoginPage />);

		expect(screen.getByText("Credenciales de prueba:")).toBeInTheDocument();
		expect(screen.getByText("admin@plataforma.com")).toBeInTheDocument();
		expect(screen.getByText("instructor@plataforma.com")).toBeInTheDocument();
	});

	test("shows validation error for empty fields", async () => {
		const user = userEvent.setup();
		renderWithProviders(<LoginPage />);

		const submitButton = screen.getByRole("button", {
			name: /iniciar sesión/i,
		});
		await user.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Por favor, completa todos los campos")
			).toBeInTheDocument();
		});
	});

	test("toggles password visibility", async () => {
		const user = userEvent.setup();
		renderWithProviders(<LoginPage />);

		const passwordInput = screen.getByLabelText(/contraseña/i);
		const toggleButton = screen.getByLabelText(/mostrar contraseña/i);

		expect(passwordInput).toHaveAttribute("type", "password");

		await user.click(toggleButton);
		expect(passwordInput).toHaveAttribute("type", "text");

		await user.click(toggleButton);
		expect(passwordInput).toHaveAttribute("type", "password");
	});

	test("shows loading state during login", () => {
		renderWithProviders(<LoginPage />, { loading: true });

		expect(screen.getByText("Iniciando sesión...")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /iniciando sesión/i })
		).toBeDisabled();
	});

	test("displays error message", () => {
		renderWithProviders(<LoginPage />, { error: "Credenciales inválidas" });

		expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
	});

	test("allows typing in form fields", async () => {
		const user = userEvent.setup();
		renderWithProviders(<LoginPage />);

		const emailInput = screen.getByLabelText(/correo electrónico/i);
		const passwordInput = screen.getByLabelText(/contraseña/i);

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");

		expect(emailInput).toHaveValue("test@example.com");
		expect(passwordInput).toHaveValue("password123");
	});
});
