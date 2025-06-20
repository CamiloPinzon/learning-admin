import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
	setSearchTerm,
	setSelectedUser,
	updateUserStatus,
	User,
} from "../../store/slices/usersSlice";
import UserModal from "../../components/UserModal/UserModal";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
	const dispatch = useDispatch();
	const { filteredUsers, searchTerm, selectedUser, loading } = useSelector(
		(state: RootState) => state.users
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value));
	};

	const handleViewUser = (user: User) => {
		dispatch(setSelectedUser(user));
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		dispatch(setSelectedUser(null));
	};

	const handleToggleUserStatus = (
		userId: string,
		currentStatus: "active" | "inactive"
	) => {
		const newStatus = currentStatus === "active" ? "inactive" : "active";
		dispatch(updateUserStatus({ id: userId, status: newStatus }));
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "admin":
				return styles.roleAdmin;
			case "instructor":
				return styles.roleInstructor;
			case "student":
				return styles.roleStudent;
			default:
				return "";
		}
	};

	const getRoleLabel = (role: string) => {
		switch (role) {
			case "admin":
				return "Administrador";
			case "instructor":
				return "Instructor";
			case "student":
				return "Estudiante";
			default:
				return role;
		}
	};

	if (loading) {
		return (
			<div
				className={styles.loading}
				role="status"
				aria-label="Cargando usuarios"
			>
				<div className={styles.spinner}></div>
				<p>Cargando usuarios...</p>
			</div>
		);
	}

	return (
		<div className={styles.usersPage}>
			<div className={styles.pageHeader}>
				<div>
					<h1>Gestión de Usuarios</h1>
					<p>Administra los usuarios de la plataforma</p>
				</div>
			</div>

			<div className={styles.usersContainer}>
				<div className={styles.searchSection}>
					<div className={styles.searchBox}>
						<input
							type="text"
							placeholder="Buscar por nombre o correo..."
							value={searchTerm}
							onChange={handleSearchChange}
							className={styles.searchInput}
							aria-label="Buscar usuarios"
						/>
						<span className={styles.searchIcon} aria-hidden="true">
							🔍
						</span>
					</div>
					<div className={styles.resultsCount}>
						{filteredUsers.length} usuario
						{filteredUsers.length !== 1 ? "s" : ""} encontrado
						{filteredUsers.length !== 1 ? "s" : ""}
					</div>
				</div>

				{filteredUsers.length === 0 ? (
					<div className={styles.emptyState}>
						<div className={styles.emptyIcon}>👥</div>
						<h3>No se encontraron usuarios</h3>
						<p>
							{searchTerm
								? "Intenta con otros términos de búsqueda"
								: "No hay usuarios registrados en el sistema"}
						</p>
					</div>
				) : (
					<div className={styles.usersTable}>
						<table className="table" role="table">
							<thead>
								<tr>
									<th scope="col">Usuario</th>
									<th scope="col">Rol</th>
									<th scope="col">Cursos</th>
									<th scope="col">Estado</th>
									<th scope="col">Fecha de Registro</th>
									<th scope="col">Acciones</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((user) => (
									<tr key={user.id}>
										<td>
											<div className={styles.userInfo}>
												<div className={styles.userAvatar}>
													{user.name.charAt(0).toUpperCase()}
												</div>
												<div>
													<div className={styles.userName}>{user.name}</div>
													<div className={styles.userEmail}>{user.email}</div>
												</div>
											</div>
										</td>
										<td>
											<span
												className={`${styles.roleBadge} ${getRoleColor(
													user.role
												)}`}
											>
												{getRoleLabel(user.role)}
											</span>
										</td>
										<td>
											<span className={styles.coursesCount}>
												{user.coursesEnrolled} curso
												{user.coursesEnrolled !== 1 ? "s" : ""}
											</span>
										</td>
										<td>
											<button
												className={`${styles.statusBadge} ${
													styles[user.status]
												}`}
												onClick={() =>
													handleToggleUserStatus(user.id, user.status)
												}
												aria-label={`Cambiar estado de ${user.name} a ${
													user.status === "active" ? "inactivo" : "activo"
												}`}
											>
												{user.status === "active" ? "Activo" : "Inactivo"}
											</button>
										</td>
										<td>
											<span className={styles.joinDate}>
												{new Date(user.joinedAt).toLocaleDateString()}
											</span>
										</td>
										<td>
											<button
												className={styles.viewButton}
												onClick={() => handleViewUser(user)}
												aria-label={`Ver detalles de ${user.name}`}
											>
												Ver Detalles
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{isModalOpen && selectedUser && (
				<UserModal user={selectedUser} onClose={handleCloseModal} />
			)}
		</div>
	);
};

export default UsersPage;
