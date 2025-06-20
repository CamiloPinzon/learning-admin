import { useState, useEffect } from "react";
import { Course } from "../../store/slices/coursesSlice";
import styles from "./CourseModal.module.css";

interface CourseModalProps {
	course: Course | null;
	onSave: (course: Omit<Course, "id" | "createdAt" | "studentsCount">) => void;
	onClose: () => void;
}

const CourseModal = ({ course, onSave, onClose }: CourseModalProps) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		duration: 0,
		instructor: "",
		status: "active" as "active" | "inactive",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (course) {
			setFormData({
				title: course.title,
				description: course.description,
				duration: course.duration,
				instructor: course.instructor,
				status: course.status,
			});
		} else {
			setFormData({
				title: "",
				description: "",
				duration: 0,
				instructor: "",
				status: "active",
			});
		}
		setErrors({});
	}, [course]);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.title.trim()) newErrors.title = "El título es requerido";

		if (!formData.description.trim())
			newErrors.description = "La descripción es requerida";

		if (!formData.instructor.trim())
			newErrors.instructor = "El instructor es requerido";

		if (formData.duration <= 0)
			newErrors.duration = "La duración debe ser mayor a 0";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) onSave(formData);
	};

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "duration" ? parseInt(value) || 0 : value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div
				className={styles.modalContent}
				role="dialog"
				aria-labelledby="modal-title"
			>
				<div className={styles.modalHeader}>
					<h2 id="modal-title">{course ? "Editar Curso" : "Nuevo Curso"}</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label="Cerrar modal"
					>
						✕
					</button>
				</div>

				<form className={styles.modalBody} onSubmit={handleSubmit} noValidate>
					<div className={styles.formGroup}>
						<label htmlFor="title" className={styles.label}>
							Título del Curso *
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className={`${styles.input} ${
								errors.title ? styles.inputError : ""
							}`}
							value={formData.title}
							onChange={handleInputChange}
							placeholder="Ej: Introducción a React"
							aria-describedby={errors.title ? "title-error" : undefined}
						/>
						{errors.title && (
							<span id="title-error" className={styles.errorText} role="alert">
								{errors.title}
							</span>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="description" className={styles.label}>
							Descripción *
						</label>
						<textarea
							id="description"
							name="description"
							className={`${styles.textarea} ${
								errors.description ? styles.inputError : ""
							}`}
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Describe el contenido del curso..."
							rows={4}
							aria-describedby={
								errors.description ? "description-error" : undefined
							}
						/>
						{errors.description && (
							<span
								id="description-error"
								className={styles.errorText}
								role="alert"
							>
								{errors.description}
							</span>
						)}
					</div>

					<div className={styles.formRow}>
						<div className={styles.formGroup}>
							<label htmlFor="instructor" className={styles.label}>
								Instructor *
							</label>
							<input
								type="text"
								id="instructor"
								name="instructor"
								className={`${styles.input} ${
									errors.instructor ? styles.inputError : ""
								}`}
								value={formData.instructor}
								onChange={handleInputChange}
								placeholder="Nombre del instructor"
								aria-describedby={
									errors.instructor ? "instructor-error" : undefined
								}
							/>
							{errors.instructor && (
								<span
									id="instructor-error"
									className={styles.errorText}
									role="alert"
								>
									{errors.instructor}
								</span>
							)}
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="duration" className={styles.label}>
								Duración (horas) *
							</label>
							<input
								type="number"
								id="duration"
								name="duration"
								className={`${styles.input} ${
									errors.duration ? styles.inputError : ""
								}`}
								value={formData.duration}
								onChange={handleInputChange}
								min="1"
								placeholder="0"
								aria-describedby={
									errors.duration ? "duration-error" : undefined
								}
							/>
							{errors.duration && (
								<span
									id="duration-error"
									className={styles.errorText}
									role="alert"
								>
									{errors.duration}
								</span>
							)}
						</div>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="status" className={styles.label}>
							Estado
						</label>
						<select
							id="status"
							name="status"
							className={styles.select}
							value={formData.status}
							onChange={handleInputChange}
						>
							<option value="active">Activo</option>
							<option value="inactive">Inactivo</option>
						</select>
					</div>

					<div className={styles.modalFooter}>
						<button
							type="button"
							className="btn btn-secondary"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button type="submit" className="btn btn-primary">
							{course ? "Actualizar" : "Crear"} Curso
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CourseModal;
