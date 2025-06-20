import { Fragment, useMemo } from "react";
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
	const visiblePages = useMemo(() => {
		if (totalPages <= 1) return [];

		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				range.push(i);
			}
			return range;
		}

		for (
			let i = Math.max(2, currentPage - delta);
			i <= Math.min(totalPages - 1, currentPage + delta);
			i++
		) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1);
			if (currentPage - delta > 3) {
				rangeWithDots.push("...");
			}
		} else {
			rangeWithDots.push(1);
		}

		if (range.length > 0 && range[0] > 1) {
			rangeWithDots.push(...range);
		}

		if (currentPage + delta < totalPages - 1) {
			if (currentPage + delta < totalPages - 2) {
				rangeWithDots.push("...");
			}
			rangeWithDots.push(totalPages);
		} else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
			rangeWithDots.push(totalPages);
		}

		const uniquePages = Array.from(new Set(rangeWithDots));
		return uniquePages.sort((a, b) => {
			if (a === "..." || b === "...") return 0;
			return (a as number) - (b as number);
		});
	}, [currentPage, totalPages]);

	if (totalPages <= 1) return null;

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
					<Fragment key={`page-${index}`}>
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
