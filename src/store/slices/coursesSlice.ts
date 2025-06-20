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
