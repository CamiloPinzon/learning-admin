interface LoginCredentials {
	email: string;
	password: string;
}

interface User {
	id: string;
	email: string;
	name: string;
	role: string;
}

interface LoginResponse {
	user: User;
	token: string;
}

const mockUsers = [
	{
		id: "1",
		email: "admin@plataforma.com",
		password: "admin123",
		name: "Administrador",
		role: "admin",
	},
	{
		id: "2",
		email: "instructor@plataforma.com",
		password: "instructor123",
		name: "Instructor Demo",
		role: "instructor",
	},
];

export const authService = {
	login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const user = mockUsers.find(
			(u) =>
				u.email === credentials.email && u.password === credentials.password
		);

		if (!user) {
			throw new Error("Credenciales inválidas");
		}

		const { password, ...userWithoutPassword } = user;
		const token = `mock-token-${user.id}-${Date.now()}`;

		if (password) {
			console.warn("Password should not be returned in production!");
		}

		return {
			user: userWithoutPassword,
			token,
		};
	},

	logout: async (): Promise<void> => {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));
	},

	validateToken: async (token: string): Promise<boolean> => {
		// Simple token validation (in real app, this would be server-side)
		return token.startsWith("mock-token-");
	},
};
