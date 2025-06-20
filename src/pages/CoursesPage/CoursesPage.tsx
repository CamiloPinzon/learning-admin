import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
	setCurrentPage,
	addCourse,
	updateCourse,
	deleteCourse,
	Course,
} from "../../store/slices/coursesSlice";
import CourseModal from "../../components/CourseModal/CourseModal";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./CoursesPage.module.css";

const CoursesPage = () => {
	const dispatch = useDispatch();
	const { courses, currentPage, itemsPerPage, loading } = useSelector(
		(state: RootState) => state.courses
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);

	const { currentCourses, totalPages } = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedCourses = courses.slice(startIndex, endIndex);
		const calculatedTotalPages = Math.ceil(courses.length / itemsPerPage);

		return {
			currentCourses: paginatedCourses,
			totalPages: calculatedTotalPages,
		};
	}, [courses, currentPage, itemsPerPage]);

	const handleAddCourse = () => {
		setEditingCourse(null);
		setIsModalOpen(true);
	};

	const handleEditCourse = (course: Course) => {
		setEditingCourse(course);
		setIsModalOpen(true);
	};

	const handleDeleteCourse = (courseId: string) => {
		if (window.confirm("¿Estás seguro de que quieres eliminar este curso?")) {
			dispatch(deleteCourse(courseId));

			const newTotalCourses = courses.length - 1;
			const newTotalPages = Math.ceil(newTotalCourses / itemsPerPage);

			if (currentPage > newTotalPages && newTotalPages > 0) {
				dispatch(setCurrentPage(newTotalPages));
			}
		}
	};

	const handleSaveCourse = (
		courseData: Omit<Course, "id" | "createdAt" | "studentsCount">
	) => {
		if (editingCourse) {
			dispatch(
				updateCourse({
					...editingCourse,
					...courseData,
				})
			);
		} else {
			dispatch(addCourse(courseData));
		}
		setIsModalOpen(false);
		setEditingCourse(null);
	};

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			dispatch(setCurrentPage(page));
		}
	};

	if (loading) {
		return (
			<div
				className={styles.loading}
				role="status"
				aria-label="Cargando cursos"
			>
				<div className={styles.spinner}></div>
				<p>Cargando cursos...</p>
			</div>
		);
	}

	return (
		<div className={styles.coursesPage}>
			<div className={styles.pageHeader}>
				<div>
					<h1>Gestión de Cursos</h1>
					<p>Administra los cursos de la plataforma</p>
				</div>
				<button
					className="btn btn-primary"
					onClick={handleAddCourse}
					aria-label="Crear nuevo curso"
				>
					+ Nuevo Curso
				</button>
			</div>

			<div className={styles.coursesContainer}>
				{courses.length === 0 ? (
					<div className={styles.emptyState}>
						<div className={styles.emptyIcon}>📚</div>
						<h3>No hay cursos disponibles</h3>
						<p>Comienza creando tu primer curso</p>
						<button className="btn btn-primary" onClick={handleAddCourse}>
							Crear Curso
						</button>
					</div>
				) : (
					<>
						<div className={styles.coursesGrid}>
							{currentCourses.map((course) => (
								<div key={course.id} className={styles.courseCard}>
									<div className={styles.courseHeader}>
										<h3 className={styles.courseTitle}>{course.title}</h3>
										<div className={styles.courseActions}>
											<button
												className={styles.actionButton}
												onClick={() => handleEditCourse(course)}
												aria-label={`Editar curso ${course.title}`}
											>
												✏️
											</button>
											<button
												className={styles.actionButton}
												onClick={() => handleDeleteCourse(course.id)}
												aria-label={`Eliminar curso ${course.title}`}
											>
												🗑️
											</button>
										</div>
									</div>

									<p className={styles.courseDescription}>
										{course.description}
									</p>

									<div className={styles.courseInfo}>
										<div className={styles.infoItem}>
											<span className={styles.infoLabel}>Instructor:</span>
											<span className={styles.infoValue}>
												{course.instructor}
											</span>
										</div>
										<div className={styles.infoItem}>
											<span className={styles.infoLabel}>Duración:</span>
											<span className={styles.infoValue}>
												{course.duration} horas
											</span>
										</div>
										<div className={styles.infoItem}>
											<span className={styles.infoLabel}>Estudiantes:</span>
											<span className={styles.infoValue}>
												{course.studentsCount}
											</span>
										</div>
										<div className={styles.infoItem}>
											<span className={styles.infoLabel}>Estado:</span>
											<span
												className={`${styles.status} ${styles[course.status]}`}
											>
												{course.status === "active" ? "Activo" : "Inactivo"}
											</span>
										</div>
									</div>

									<div className={styles.courseFooter}>
										<span className={styles.createdDate}>
											Creado: {new Date(course.createdAt).toLocaleDateString()}
										</span>
									</div>
								</div>
							))}
						</div>

						{totalPages > 1 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
					</>
				)}
			</div>

			{isModalOpen && (
				<CourseModal
					course={editingCourse}
					onSave={handleSaveCourse}
					onClose={() => {
						setIsModalOpen(false);
						setEditingCourse(null);
					}}
				/>
			)}
		</div>
	);
};

export default CoursesPage;
