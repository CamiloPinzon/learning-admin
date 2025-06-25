import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	id: string;
	name: string;
	email: string;
	role: "student" | "instructor" | "admin";
	joinedAt: string;
	coursesEnrolled: number;
	status: "active" | "inactive";
	avatar?: string;
}

interface UsersState {
	users: User[];
	filteredUsers: User[];
	loading: boolean;
	error: string | null;
	searchTerm: string;
	selectedUser: User | null;
}

const mockUsers: User[] = [
	{
		id: "1",
		name: "Juan Pérez",
		email: "juan.perez@email.com",
		role: "student",
		joinedAt: "2024-01-15",
		coursesEnrolled: 3,
		status: "active",
	},
	{
		id: "2",
		name: "María García",
		email: "maria.garcia@email.com",
		role: "instructor",
		joinedAt: "2023-12-01",
		coursesEnrolled: 0,
		status: "active",
	},
	{
		id: "3",
		name: "Carlos López",
		email: "carlos.lopez@email.com",
		role: "instructor",
		joinedAt: "2023-11-15",
		coursesEnrolled: 0,
		status: "active",
	},
	{
		id: "4",
		name: "Ana Martínez",
		email: "ana.martinez@email.com",
		role: "student",
		joinedAt: "2024-01-10",
		coursesEnrolled: 2,
		status: "active",
	},
	{
		id: "5",
		name: "Pedro Rodríguez",
		email: "pedro.rodriguez@email.com",
		role: "student",
		joinedAt: "2024-01-05",
		coursesEnrolled: 1,
		status: "inactive",
	},
	{
		id: "6",
		name: "Laura Sánchez",
		email: "laura.sanchez@email.com",
		role: "instructor",
		joinedAt: "2023-10-20",
		coursesEnrolled: 0,
		status: "active",
	},
	{
		id: "7",
		name: "Diego Fernández",
		email: "diego.fernandez@email.com",
		role: "student",
		joinedAt: "2024-01-20",
		coursesEnrolled: 4,
		status: "active",
	},
	{
		id: "8",
		name: "Sofia Ruiz",
		email: "sofia.ruiz@email.com",
		role: "student",
		joinedAt: "2024-01-12",
		coursesEnrolled: 2,
		status: "active",
	},
];

const initialState: UsersState = {
	users: mockUsers,
	filteredUsers: mockUsers,
	loading: false,
	error: null,
	searchTerm: "",
	selectedUser: null,
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
			state.filteredUsers = action.payload;
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
			const term = action.payload.toLowerCase();
			state.filteredUsers = state.users.filter(
				(user) =>
					user.name.toLowerCase().includes(term) ||
					user.email.toLowerCase().includes(term)
			);
		},
		setSelectedUser: (state, action: PayloadAction<User | null>) => {
			state.selectedUser = action.payload;
		},
		updateUserStatus: (
			state,
			action: PayloadAction<{ id: string; status: "active" | "inactive" }>
		) => {
			const user = state.users.find((u) => u.id === action.payload.id);
			if (user) {
				user.status = action.payload.status;
			}
			
			const filteredUser = state.filteredUsers.find(
				(u) => u.id === action.payload.id
			);
			if (filteredUser) {
				filteredUser.status = action.payload.status;
			}
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
	setUsers,
	setSearchTerm,
	setSelectedUser,
	updateUserStatus,
	setError,
	clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
