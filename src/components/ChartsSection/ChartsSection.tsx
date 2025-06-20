import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
} from "recharts";
import styles from "./ChartsSection.module.css";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const ChartsSection = () => {
	const { enrollmentsByMonth, usersByRole, coursesByStatus } = useSelector(
		(state: RootState) => state.dashboard
	);

	return (
		<div className={styles.chartsSection}>
			<div className={styles.chartContainer}>
				<div className={styles.chartHeader}>
					<h2>Inscripciones por Mes</h2>
					<p>Evolución de inscripciones durante el año</p>
				</div>
				<div className={styles.chartWrapper}>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={enrollmentsByMonth}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
							<YAxis stroke="#6b7280" fontSize={12} />
							<Tooltip
								contentStyle={{
									backgroundColor: "white",
									border: "1px solid #e5e7eb",
									borderRadius: "0.5rem",
									boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
								}}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#3b82f6"
								strokeWidth={3}
								dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
								activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className={styles.chartsRow}>
				<div className={styles.chartContainer}>
					<div className={styles.chartHeader}>
						<h2>Usuarios por Rol</h2>
						<p>Distribución de usuarios</p>
					</div>
					<div className={styles.chartWrapper}>
						<ResponsiveContainer width="100%" height={250}>
							<PieChart>
								<Pie
									data={usersByRole}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
								>
									{usersByRole.map((_, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: "white",
										border: "1px solid #e5e7eb",
										borderRadius: "0.5rem",
										boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className={styles.chartContainer}>
					<div className={styles.chartHeader}>
						<h2>Estado de Cursos</h2>
						<p>Cursos activos vs inactivos</p>
					</div>
					<div className={styles.chartWrapper}>
						<ResponsiveContainer width="100%" height={250}>
							<BarChart data={coursesByStatus}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
								<YAxis stroke="#6b7280" fontSize={12} />
								<Tooltip
									contentStyle={{
										backgroundColor: "white",
										border: "1px solid #e5e7eb",
										borderRadius: "0.5rem",
										boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
									}}
								/>
								<Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChartsSection;
