import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: string;
	email: string;
	name: string;
	role: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: !!localStorage.getItem("authToken"),
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user")!)
		: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.loading = false;
			state.error = null;
			localStorage.setItem("authToken", action.payload.token);
			localStorage.setItem("user", JSON.stringify(action.payload.user));
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = null;
			localStorage.removeItem("authToken");
			localStorage.removeItem("user");
		},
		clearError: (state) => {
			state.error = null;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
	authSlice.actions;
export default authSlice.reducer;
