import { Fragment } from "react/jsx-runtime";
import styles from "./Pagination.module.css";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const getVisiblePages = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	if (totalPages <= 1) return null;

	const visiblePages = getVisiblePages();

	return (
		<nav
			className={styles.pagination}
			role="navigation"
			aria-label="Paginación"
		>
			<button
				className={styles.pageButton}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Página anterior"
			>
				← Anterior
			</button>

			<div className={styles.pageNumbers}>
				{visiblePages.map((page, index) => (
					<Fragment key={index}>
						{page === "..." ? (
							<span className={styles.dots} aria-hidden="true">
								...
							</span>
						) : (
							<button
								className={`${styles.pageNumber} ${
									page === currentPage ? styles.active : ""
								}`}
								onClick={() => onPageChange(page as number)}
								aria-label={`Página ${page}`}
								aria-current={page === currentPage ? "page" : undefined}
							>
								{page}
							</button>
						)}
					</Fragment>
				))}
			</div>

			<button
				className={styles.pageButton}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Página siguiente"
			>
				Siguiente →
			</button>
		</nav>
	);
};

export default Pagination;
