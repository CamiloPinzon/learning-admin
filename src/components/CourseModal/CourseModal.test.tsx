import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseModal from "./CourseModal";
import { Course } from "@/store/slices/coursesSlice";

const mockCourse: Course = {
	id: "1",
	title: "Test Course",
	description: "Test Description",
	duration: 40,
	instructor: "Test Instructor",
	createdAt: "2024-01-01",
	studentsCount: 10,
	status: "active",
};

const mockOnSave = jest.fn();
const mockOnClose = jest.fn();

describe("CourseModal", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders modal for creating new course", () => {
		render(
			<CourseModal course={null} onSave={mockOnSave} onClose={mockOnClose} />
		);

		expect(screen.getByText("Nuevo Curso")).toBeInTheDocument();
		expect(screen.getByText("Crear Curso")).toBeInTheDocument();
	});

	test("renders modal for editing existing course", () => {
		render(
			<CourseModal
				course={mockCourse}
				onSave={mockOnSave}
				onClose={mockOnClose}
			/>
		);

		expect(screen.getByText("Editar Curso")).toBeInTheDocument();
		expect(screen.getByText("Actualizar Curso")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Test Course")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
	});

	test("validates required fields", async () => {
		const user = userEvent.setup();

		render(
			<CourseModal course={null} onSave={mockOnSave} onClose={mockOnClose} />
		);

		const submitButton = screen.getByText("Crear Curso");
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText("El título es requerido")).toBeInTheDocument();
			expect(
				screen.getByText("La descripción es requerida")
			).toBeInTheDocument();
			expect(
				screen.getByText("El instructor es requerido")
			).toBeInTheDocument();
		});

		expect(mockOnSave).not.toHaveBeenCalled();
	});

	test("calls onSave with form data when valid", async () => {
		const user = userEvent.setup();

		render(
			<CourseModal course={null} onSave={mockOnSave} onClose={mockOnClose} />
		);

		await user.type(screen.getByLabelText(/título del curso/i), "New Course");
		await user.type(screen.getByLabelText(/descripción/i), "New Description");
		await user.type(screen.getByLabelText(/instructor/i), "New Instructor");
		await user.type(screen.getByLabelText(/duración/i), "30");

		const submitButton = screen.getByText("Crear Curso");
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockOnSave).toHaveBeenCalledWith({
				title: "New Course",
				description: "New Description",
				instructor: "New Instructor",
				duration: 30,
				status: "active",
			});
		});
	});

	test("calls onClose when close button is clicked", async () => {
		const user = userEvent.setup();

		render(
			<CourseModal course={null} onSave={mockOnSave} onClose={mockOnClose} />
		);

		const closeButton = screen.getByLabelText(/cerrar modal/i);
		await user.click(closeButton);

		expect(mockOnClose).toHaveBeenCalled();
	});

	test("calls onClose when overlay is clicked", async () => {
		const user = userEvent.setup();

		render(
			<CourseModal course={null} onSave={mockOnSave} onClose={mockOnClose} />
		);

		const overlay = screen.getByRole("dialog").parentElement;
		if (overlay) {
			await user.click(overlay);
			expect(mockOnClose).toHaveBeenCalled();
		}
	});
});
