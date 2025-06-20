import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import StatsCards from "../../components/StatsCards/StatsCards";
import ChartsSection from "../../components/ChartsSection/ChartsSection";
import styles from "./DashboardPage.module.css";

const DashboardPage: React.FC = () => {
	const { stats, loading } = useSelector((state: RootState) => state.dashboard);

	if (loading) {
		return (
			<div
				className={styles.loading}
				role="status"
				aria-label="Cargando dashboard"
			>
				<div className={styles.spinner}></div>
				<p>Cargando estadísticas...</p>
			</div>
		);
	}

	return (
		<div className={styles.dashboard}>
			<div className={styles.dashboardHeader}>
				<h1>Dashboard</h1>
				<p>Resumen general de la plataforma de aprendizaje</p>
			</div>

			<StatsCards stats={stats} />
			<ChartsSection />
		</div>
	);
};

export default DashboardPage;
