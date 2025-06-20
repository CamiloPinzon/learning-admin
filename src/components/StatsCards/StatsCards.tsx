import React from "react";
import styles from "./StatsCards.module.css";

interface StatsCardsProps {
	stats: {
		totalCourses: number;
		totalUsers: number;
		activeUsers: number;
		totalEnrollments: number;
	};
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
	const cards = [
		{
			title: "Total Cursos",
			value: stats.totalCourses,
			icon: "📚",
			color: "blue",
			description: "Cursos disponibles",
		},
		{
			title: "Total Usuarios",
			value: stats.totalUsers,
			icon: "👥",
			color: "green",
			description: "Usuarios registrados",
		},
		{
			title: "Usuarios Activos",
			value: stats.activeUsers,
			icon: "✅",
			color: "purple",
			description: "Usuarios activos",
		},
		{
			title: "Inscripciones",
			value: stats.totalEnrollments,
			icon: "📝",
			color: "orange",
			description: "Total de inscripciones",
		},
	];

	return (
		<div className={styles.statsGrid}>
			{cards.map((card, index) => (
				<div key={index} className={`${styles.statCard} ${styles[card.color]}`}>
					<div className={styles.cardHeader}>
						<div className={styles.cardIcon} aria-hidden="true">
							{card.icon}
						</div>
						<div className={styles.cardInfo}>
							<h3 className={styles.cardTitle}>{card.title}</h3>
							<p className={styles.cardDescription}>{card.description}</p>
						</div>
					</div>
					<div className={styles.cardValue}>{card.value.toLocaleString()}</div>
				</div>
			))}
		</div>
	);
};

export default StatsCards;
