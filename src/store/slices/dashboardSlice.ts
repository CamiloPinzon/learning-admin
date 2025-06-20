import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardStats {
	totalCourses: number;
	totalUsers: number;
	activeUsers: number;
	totalEnrollments: number;
}

interface ChartData {
	name: string;
	value: number;
}

interface DashboardState {
	stats: DashboardStats;
	enrollmentsByMonth: ChartData[];
	usersByRole: ChartData[];
	coursesByStatus: ChartData[];
	loading: boolean;
	error: string | null;
}

const mockEnrollmentsByMonth: ChartData[] = [
	{ name: "Ene", value: 45 },
	{ name: "Feb", value: 52 },
	{ name: "Mar", value: 48 },
	{ name: "Abr", value: 61 },
	{ name: "May", value: 55 },
	{ name: "Jun", value: 67 },
	{ name: "Jul", value: 72 },
	{ name: "Ago", value: 69 },
	{ name: "Sep", value: 75 },
	{ name: "Oct", value: 78 },
	{ name: "Nov", value: 82 },
	{ name: "Dic", value: 89 },
];

const mockUsersByRole: ChartData[] = [
	{ name: "Estudiantes", value: 245 },
	{ name: "Instructores", value: 18 },
	{ name: "Administradores", value: 3 },
];

const mockCoursesByStatus: ChartData[] = [
	{ name: "Activos", value: 24 },
	{ name: "Inactivos", value: 6 },
];

const initialState: DashboardState = {
	stats: {
		totalCourses: 30,
		totalUsers: 266,
		activeUsers: 245,
		totalEnrollments: 402,
	},
	enrollmentsByMonth: mockEnrollmentsByMonth,
	usersByRole: mockUsersByRole,
	coursesByStatus: mockCoursesByStatus,
	loading: false,
	error: null,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setStats: (state, action: PayloadAction<DashboardStats>) => {
			state.stats = action.payload;
		},
		setEnrollmentsByMonth: (state, action: PayloadAction<ChartData[]>) => {
			state.enrollmentsByMonth = action.payload;
		},
		setUsersByRole: (state, action: PayloadAction<ChartData[]>) => {
			state.usersByRole = action.payload;
		},
		setCoursesByStatus: (state, action: PayloadAction<ChartData[]>) => {
			state.coursesByStatus = action.payload;
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
	setStats,
	setEnrollmentsByMonth,
	setUsersByRole,
	setCoursesByStatus,
	setError,
	clearError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
