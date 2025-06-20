# Plataforma de Aprendizaje - Panel de Administración

Una interfaz de administración moderna y completa para gestionar cursos, usuarios y estadísticas de una plataforma de aprendizaje en línea.

## Características

### Funcionalidades Implementadas

- **Autenticación Simulada**
  - Sistema de login con credenciales mock
  - Persistencia de sesión con localStorage
  - Protección de rutas privadas

- **Gestión de Cursos**
  - Listado de cursos con paginación
  - Creación y edición de cursos mediante modal
  - Campos: título, descripción, duración, instructor, estado
  - Eliminación de cursos con confirmación

- **Gestión de Usuarios**
  - Listado completo de usuarios
  - Búsqueda por nombre o correo electrónico
  - Visualización de detalles individuales en modal
  - Cambio de estado (activo/inactivo)
  - Diferentes roles: estudiante, instructor, administrador

- **Dashboard con Estadísticas**
  - Tarjetas de métricas principales
  - Gráficos interactivos con Recharts:
    - Evolución de inscripciones por mes (línea)
    - Distribución de usuarios por rol (circular)
    - Estado de cursos (barras)

- **Diseño Responsive**
  - Adaptable a dispositivos móviles y desktop
  - Sidebar colapsable en móviles
  - Tablas con scroll horizontal en pantallas pequeñas

- **Accesibilidad**
  - Roles ARIA apropiados
  - Etiquetas descriptivas
  - Navegación por teclado
  - Indicadores de estado para lectores de pantalla

##  Tecnologías Utilizadas

- **Frontend Framework**: React 18 con TypeScript
- **Enrutamiento**: React Router v6
- **Estado Global**: Redux Toolkit (RTK)
- **Estilos**: CSS Modules
- **Gráficos**: Recharts
- **Testing**: Jest + React Testing Library
- **Build Tool**: Vite
- **Linting**: ESLint

## Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd learning-platform-admin
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## Credenciales de Acceso

### Administrador
- **Email**: admin@plataforma.com
- **Contraseña**: admin123

### Instructor
- **Email**: instructor@plataforma.com
- **Contraseña**: instructor123

## Testing

Ejecutar todas las pruebas:
```bash
npm test
```

Ejecutar pruebas en modo watch:
```bash
npm run test:watch
```

### Cobertura de Testing
- **StatsCards**: Renderizado y formateo de datos
- **CourseModal**: Validación de formularios y funcionalidad CRUD
- **LoginPage**: Autenticación y validación de campos

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout/         # Layout principal con sidebar
│   ├── StatsCards/     # Tarjetas de estadísticas
│   ├── ChartsSection/  # Sección de gráficos
│   ├── CourseModal/    # Modal para cursos
│   ├── UserModal/      # Modal para usuarios
│   ├── Pagination/     # Componente de paginación
│   └── ProtectedRoute/ # Protección de rutas
├── pages/              # Páginas principales
│   ├── LoginPage/      # Página de login
│   ├── DashboardPage/  # Dashboard principal
│   ├── CoursesPage/    # Gestión de cursos
│   └── UsersPage/      # Gestión de usuarios
├── store/              # Estado global Redux
│   ├── slices/         # Slices de Redux Toolkit
│   └── store.ts        # Configuración del store
├── services/           # Servicios y APIs
├── styles/             # Estilos globales
└── App.tsx             # Componente raíz
```

## Decisiones Técnicas

### Arquitectura y Organización
- **Separación por capas**: Componentes, servicios, estilos y estado claramente separados
- **CSS Modules**: Para evitar conflictos de estilos y mantener el CSS encapsulado
- **Redux Toolkit**: Para un manejo de estado más simple y eficiente
- **TypeScript**: Para mayor seguridad de tipos y mejor experiencia de desarrollo

### Diseño y UX
- **Design System**: Colores consistentes, espaciado de 8px, tipografía escalable
- **Micro-interacciones**: Hover states, transiciones suaves, feedback visual
- **Responsive First**: Diseño móvil primero con breakpoints progresivos
- **Accesibilidad**: Cumplimiento de estándares WCAG básicos

### Rendimiento
- **Lazy Loading**: Componentes cargados bajo demanda
- **Memoización**: Uso de React.memo donde es apropiado
- **Paginación**: Para manejar grandes conjuntos de datos
- **Optimización de bundle**: Vite para builds rápidos

## Mejoras Futuras

### Funcionalidades Pendientes
- [ ] **Autenticación Real**: Integración con backend y JWT
- [ ] **Filtros Avanzados**: Filtrado por fecha, estado, rol en todas las vistas
- [ ] **Exportación de Datos**: CSV/PDF para reportes
- [ ] **Notificaciones**: Sistema de notificaciones en tiempo real
- [ ] **Tema Oscuro**: Soporte para modo oscuro
- [ ] **Internacionalización**: Soporte multi-idioma

### Mejoras Técnicas
- [ ] **Testing E2E**: Cypress o Playwright para pruebas end-to-end
- [ ] **Storybook**: Documentación de componentes
- [ ] **PWA**: Funcionalidades de Progressive Web App
- [ ] **Optimización de Imágenes**: Lazy loading y formatos modernos
- [ ] **Cache Strategy**: Implementar estrategias de cache
- [ ] **Error Boundaries**: Manejo robusto de errores

### UX/UI
- [ ] **Drag & Drop**: Para reordenar elementos
- [ ] **Búsqueda Avanzada**: Con filtros y sugerencias
- [ ] **Bulk Actions**: Acciones masivas en tablas
- [ ] **Keyboard Shortcuts**: Atajos de teclado para power users
- [ ] **Onboarding**: Tour guiado para nuevos usuarios

## Métricas de Calidad

- **Cobertura de Tests**: 3 componentes principales testeados
- **Accesibilidad**: Roles ARIA, navegación por teclado
- **Performance**: Lazy loading, optimización de renders
- **Mantenibilidad**: Código modular, TypeScript, documentación

---