import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice";
import usersReducer from "./slices/usersSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		courses: coursesReducer,
		users: usersReducer,
		dashboard: dashboardReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
