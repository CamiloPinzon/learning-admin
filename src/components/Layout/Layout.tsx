import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import styles from "./Layout.module.css";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useSelector((state: RootState) => state.auth.user);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const navigationItems = [
		{ path: "/dashboard", label: "Dashboard", icon: "📊" },
		{ path: "/courses", label: "Cursos", icon: "📚" },
		{ path: "/users", label: "Usuarios", icon: "👥" },
	];

	return (
		<div className={styles.layout}>
			<aside
				className={styles.sidebar}
				role="navigation"
				aria-label="Navegación principal"
			>
				<div className={styles.sidebarHeader}>
					<h1 className={styles.logo}>
						<span className={styles.logoIcon}>🎓</span>
						Plataforma Admin
					</h1>
				</div>

				<nav className={styles.navigation}>
					<ul>
						{navigationItems.map((item) => (
							<li key={item.path}>
								<button
									className={`${styles.navItem} ${
										location.pathname === item.path ? styles.navItemActive : ""
									}`}
									onClick={() => navigate(item.path)}
									aria-current={
										location.pathname === item.path ? "page" : undefined
									}
								>
									<span className={styles.navIcon} aria-hidden="true">
										{item.icon}
									</span>
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			<div className={styles.mainContent}>
				<header className={styles.header}>
					<div className={styles.headerContent}>
						<h2 className={styles.pageTitle}>
							{navigationItems.find((item) => item.path === location.pathname)
								?.label || "Dashboard"}
						</h2>

						<div className={styles.userMenu}>
							<div className={styles.userInfo}>
								<span className={styles.userName}>{user?.name}</span>
								<span className={styles.userRole}>{user?.role}</span>
							</div>
							<button
								className={styles.logoutButton}
								onClick={handleLogout}
								aria-label="Cerrar sesión"
							>
								Salir
							</button>
						</div>
					</div>
				</header>

				<main className={styles.content} role="main">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
