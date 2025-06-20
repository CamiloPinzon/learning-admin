import { render, screen } from "@testing-library/react";
import StatsCards from "./StatsCards";

const mockStats = {
	totalCourses: 25,
	totalUsers: 150,
	activeUsers: 120,
	totalEnrollments: 300,
};

describe("StatsCards", () => {
	test("renders all stat cards with correct values", () => {
		render(<StatsCards stats={mockStats} />);

		expect(screen.getByText("Total Cursos")).toBeInTheDocument();
		expect(screen.getByText("25")).toBeInTheDocument();

		expect(screen.getByText("Total Usuarios")).toBeInTheDocument();
		expect(screen.getByText("150")).toBeInTheDocument();

		expect(screen.getByText("Usuarios Activos")).toBeInTheDocument();
		expect(screen.getByText("120")).toBeInTheDocument();

		expect(screen.getByText("Inscripciones")).toBeInTheDocument();
		expect(screen.getByText("300")).toBeInTheDocument();
	});

	test("renders card descriptions", () => {
		render(<StatsCards stats={mockStats} />);

		expect(screen.getByText("Cursos disponibles")).toBeInTheDocument();
		expect(screen.getByText("Usuarios registrados")).toBeInTheDocument();
		expect(screen.getByText("Usuarios activos")).toBeInTheDocument();
		expect(screen.getByText("Total de inscripciones")).toBeInTheDocument();
	});

	test("formats large numbers correctly", () => {
		const largeStats = {
			totalCourses: 1000,
			totalUsers: 1500,
			activeUsers: 1200,
			totalEnrollments: 3000,
		};

		render(<StatsCards stats={largeStats} />);

		expect(screen.getByText("1,000")).toBeInTheDocument();
		expect(screen.getByText("1,500")).toBeInTheDocument();
		expect(screen.getByText("1,200")).toBeInTheDocument();
		expect(screen.getByText("3,000")).toBeInTheDocument();
	});
});
