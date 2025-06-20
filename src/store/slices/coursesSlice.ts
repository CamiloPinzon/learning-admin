import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Course {
	id: string;
	title: string;
	description: string;
	duration: number;
	instructor: string;
	createdAt: string;
	studentsCount: number;
	status: "active" | "inactive";
}

interface CoursesState {
	courses: Course[];
	loading: boolean;
	error: string | null;
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
}

const mockCourses: Course[] = [
	{
		id: "1",
		title: "Introducción a React",
		description: "Aprende los fundamentos de React desde cero",
		duration: 40,
		instructor: "María García",
		createdAt: "2024-01-15",
		studentsCount: 125,
		status: "active",
	},
	{
		id: "2",
		title: "JavaScript Avanzado",
		description: "Domina conceptos avanzados de JavaScript",
		duration: 60,
		instructor: "Carlos López",
		createdAt: "2024-01-10",
		studentsCount: 89,
		status: "active",
	},
	{
		id: "3",
		title: "CSS Grid y Flexbox",
		description: "Crea layouts modernos con CSS Grid y Flexbox",
		duration: 25,
		instructor: "Ana Martínez",
		createdAt: "2024-01-05",
		studentsCount: 67,
		status: "active",
	},
	{
		id: "4",
		title: "Node.js Fundamentals",
		description: "Desarrollo backend con Node.js",
		duration: 45,
		instructor: "Pedro Rodríguez",
		createdAt: "2024-01-01",
		studentsCount: 43,
		status: "inactive",
	},
	{
		id: "5",
		title: "TypeScript Essentials",
		description: "Aprende TypeScript para proyectos escalables",
		duration: 35,
		instructor: "Laura Sánchez",
		createdAt: "2023-12-28",
		studentsCount: 78,
		status: "active",
	},
	{
		id: "6",
		title: "React Native Basics",
		description: "Desarrollo aplicaciones nativas con React Native",
		duration: 30,
		instructor: "Miguel Rodríguez",
		createdAt: "2023-12-22",
		studentsCount: 56,
		status: "active",
	},
	{
		id: "7",
		title: "Python for Beginners",
		description: "Aprende Python desde cero para desarrolladores",
		duration: 50,
		instructor: "Sofia Rodríguez",
		createdAt: "2023-12-15",
		studentsCount: 32,
		status: "active",
	},
	{
		id: "8",
		title: "Vue.js Fundamentals",
		description: "Desarrollo frontend con Vue.js",
		duration: 40,
		instructor: "Luis Rodríguez",
		createdAt: "2023-12-10",
		studentsCount: 54,
		status: "active",
	},
	{
		id: "9",
		title: "Docker Basics",
		description: "Contenedores y Docker para desarrolladores",
		duration: 35,
		instructor: "Ana Rodríguez",
		createdAt: "2023-12-05",
		studentsCount: 28,
		status: "active",
	},
	{
		id: "10",
		title: "GraphQL Essentials",
		description: "Aprende GraphQL para APIs modernas",
		duration: 45,
		instructor: "Javier Pérez",
		createdAt: "2023-11-30",
		studentsCount: 22,
		status: "inactive",
	},
	{
		id: "11",
		title: "Machine Learning Basics",
		description: "Introducción al aprendizaje automático",
		duration: 55,
		instructor: "Clara Fernández",
		createdAt: "2023-11-25",
		studentsCount: 15,
		status: "active",
	},
	{
		id: "12",
		title: "DevOps Fundamentals",
		description: "Cultura DevOps y herramientas esenciales",
		duration: 50,
		instructor: "David Gómez",
		createdAt: "2023-11-20",
		studentsCount: 18,
		status: "inactive",
	},
	{
		id: "13",
		title: "Angular Fundamentals",
		description: "Desarrollo frontend con Angular",
		duration: 40,
		instructor: "Sara Rodríguez",
		createdAt: "2023-11-15",
		studentsCount: 12,
		status: "active",
	},
	{
		id: "14",
		title: "Ruby on Rails Basics",
		description: "Desarrollo web con Ruby on Rails",
		duration: 45,
		instructor: "Luis Rodríguez",
		createdAt: "2023-11-10",
		studentsCount: 9,
		status: "active",
	},
	{
		id: "15",
		title: "SQL for Data Analysis",
		description: "Análisis de datos con SQL",
		duration: 30,
		instructor: "Elena Martínez",
		createdAt: "2023-11-05",
		studentsCount: 20,
		status: "active",
	},
];

const initialState: CoursesState = {
	courses: mockCourses,
	loading: false,
	error: null,
	currentPage: 1,
	totalPages: 1,
	itemsPerPage: 10,
};

const coursesSlice = createSlice({
	name: "courses",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setCourses: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
			state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage);
		},
		addCourse: (
			state,
			action: PayloadAction<Omit<Course, "id" | "createdAt" | "studentsCount">>
		) => {
			const newCourse: Course = {
				...action.payload,
				id: Date.now().toString(),
				createdAt: new Date().toISOString().split("T")[0],
				studentsCount: 0,
			};
			state.courses.unshift(newCourse);
			state.totalPages = Math.ceil(state.courses.length / state.itemsPerPage);
		},
		updateCourse: (state, action: PayloadAction<Course>) => {
			const index = state.courses.findIndex(
				(course) => course.id === action.payload.id
			);
			if (index !== -1) {
				state.courses[index] = action.payload;
			}
		},
		deleteCourse: (state, action: PayloadAction<string>) => {
			state.courses = state.courses.filter(
				(course) => course.id !== action.payload
			);
			state.totalPages = Math.ceil(state.courses.length / state.itemsPerPage);
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const {
	setLoading,
	setCourses,
	addCourse,
	updateCourse,
	deleteCourse,
	setCurrentPage,
	setError,
	clearError,
} = coursesSlice.actions;

export default coursesSlice.reducer;
