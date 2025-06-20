import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoursesPage from "./pages/CoursesPage/CoursesPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	return (
		<Routes>
			<Route
				path="/login"
				element={
					isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
				}
			/>
			<Route
				path="/*"
				element={
					<ProtectedRoute>
						<Layout>
							<Routes>
								<Route
									path="/"
									element={<Navigate to="/dashboard" replace />}
								/>
								<Route path="/dashboard" element={<DashboardPage />} />
								<Route path="/courses" element={<CoursesPage />} />
								<Route path="/users" element={<UsersPage />} />
							</Routes>
						</Layout>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
