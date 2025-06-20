import React from "react";
import { User } from "../../store/slices/usersSlice";
import styles from "./UserModal.module.css";

interface UserModalProps {
	user: User;
	onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
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

	return (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div
				className={styles.modalContent}
				role="dialog"
				aria-labelledby="modal-title"
			>
				<div className={styles.modalHeader}>
					<h2 id="modal-title">Detalles del Usuario</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Cerrar modal"
					>
						✕
					</button>
				</div>

				<div className={styles.modalBody}>
					<div className={styles.userProfile}>
						<div className={styles.userAvatar}>
							{user.name.charAt(0).toUpperCase()}
						</div>
						<div className={styles.userBasicInfo}>
							<h3 className={styles.userName}>{user.name}</h3>
							<p className={styles.userEmail}>{user.email}</p>
							<span
								className={`${styles.roleBadge} ${getRoleColor(user.role)}`}
							>
								{getRoleLabel(user.role)}
							</span>
						</div>
					</div>

					<div className={styles.userDetails}>
						<div className={styles.detailSection}>
							<h4>Información General</h4>
							<div className={styles.detailGrid}>
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>ID de Usuario:</span>
									<span className={styles.detailValue}>{user.id}</span>
								</div>
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>Estado:</span>
									<span
										className={`${styles.statusBadge} ${styles[user.status]}`}
									>
										{user.status === "active" ? "Activo" : "Inactivo"}
									</span>
								</div>
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>Fecha de Registro:</span>
									<span className={styles.detailValue}>
										{new Date(user.joinedAt).toLocaleDateString("es-ES", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
								<div className={styles.detailItem}>
									<span className={styles.detailLabel}>Cursos Inscritos:</span>
									<span className={styles.detailValue}>
										{user.coursesEnrolled} curso
										{user.coursesEnrolled !== 1 ? "s" : ""}
									</span>
								</div>
							</div>
						</div>

						{user.role === "student" && (
							<div className={styles.detailSection}>
								<h4>Estadísticas de Aprendizaje</h4>
								<div className={styles.statsGrid}>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{user.coursesEnrolled}
										</div>
										<div className={styles.statLabel}>Cursos Inscritos</div>
									</div>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{Math.floor(Math.random() * 80) + 20}%
										</div>
										<div className={styles.statLabel}>Progreso Promedio</div>
									</div>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{Math.floor(Math.random() * 50) + 10}h
										</div>
										<div className={styles.statLabel}>Tiempo de Estudio</div>
									</div>
								</div>
							</div>
						)}

						{user.role === "instructor" && (
							<div className={styles.detailSection}>
								<h4>Estadísticas de Enseñanza</h4>
								<div className={styles.statsGrid}>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{Math.floor(Math.random() * 5) + 1}
										</div>
										<div className={styles.statLabel}>Cursos Creados</div>
									</div>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{Math.floor(Math.random() * 200) + 50}
										</div>
										<div className={styles.statLabel}>Estudiantes Totales</div>
									</div>
									<div className={styles.statItem}>
										<div className={styles.statValue}>
											{(Math.random() * 2 + 3).toFixed(1)}⭐
										</div>
										<div className={styles.statLabel}>
											Calificación Promedio
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className={styles.modalFooter}>
					<button className="btn btn-secondary" onClick={onClose}>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserModal;
