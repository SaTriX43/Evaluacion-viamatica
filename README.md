# Prueba Técnica NODE JS - ANGULAR

Este repositorio contiene el desarrollo de la prueba técnica para aspirantes JR en Node JS y Angular, consistente en una API REST para la gestión de películas y salas de cine, y una aplicación frontend para interactuar con dicha API.

## Descripción del Sistema

El sistema consta de dos partes principales:

1.  **Backend (API REST):** Desarrollado con Node.js, Express . Proporciona endpoints para la gestión de películas y salas de cine, la asignación de películas a salas, y la consulta de indicadores básicos para un dashboard. Se conecta a una base de datos PostgreSQL.
    * **Funcionalidades Implementadas:**
        * CRUD completo para **Películas** (Crear, Listar, Editar, Eliminación Lógica).
        * Búsqueda de películas por nombre y fecha de publicación.
        * CRUD básico para **Salas de Cine** (Crear, Listar, Editar - sin eliminación lógica).
        * Consulta del estado calculado de una sala de cine (disponible, con [n] películas, no disponible) basado en asignaciones.
        * Registro de **Asignaciones** de películas a salas con rango de fechas.
        * Consulta de indicadores para el Dashboard (total de películas, salas, salas disponibles).
        * Validación básica de datos de entrada.
        * Desarrollo modular.
        * Colección de Postman para probar los endpoints.
        * _Nota: La implementación de Swagger y la Autenticación JWT quedaron pendientes debido a limitaciones de tiempo._

2.  **Frontend (Aplicación Angular):** Desarrollado con Angular (usando Standalone Components y Signals). Consume la API REST del backend para permitir a los usuarios interactuar con los datos.
    * **Funcionalidades Implementadas:**
        * Layout básico con menú lateral.
        * Pantalla de **Dashboard** mostrando los indicadores obtenidos del backend.
        * Pantalla de **Gestión de Películas** (Listado, Formulario de Creación, Formulario de Edición/Actualización, Funcionalidad de Eliminación Lógica, Búsqueda por Nombre y Fecha de Publicación).
        * Pantalla de **Gestión de Salas de Cine** (Listado, Formulario de Creación, Formulario de Edición/Actualización, Búsqueda por Nombre, Visualización del Estado Calculado de Sala - implementado con un `alert` simple).
        * Pantalla de **Asignación de Películas a Salas** (Formulario para seleccionar película, sala y fechas, y guardar la asignación).
        * Uso de un framework CSS (Tailwind CSS).
        * Uso de Standalone Components y Signals.
        * Navegación entre pantallas principales a través del menú.
        * _Nota: La pantalla de Login y la integración completa de la Autenticación JWT quedaron pendientes debido a limitaciones de tiempo._

## Versiones de Tecnologías Utilizadas

A continuación, se listan las versiones principales de las tecnologías utilizadas en este proyecto. Puedes verificarlas con los archivos `package.json` de cada proyecto.

* **Node.js:** 
* **npm:**
* **Express:**
* **pg (PostgreSQL client):** 
* **Angular CLI:** 
* **Angular Core:** 
* **TypeScript (Frontend):** 
* **Tailwind CSS:** 

## Estructura del Proyecto

El repositorio se organiza en las siguientes carpetas principales:

backend/
├── config/
│   └── db.config.mjs       # Archivo de configuración para la conexión a la base de datos.
├── controllers/
│   ├── asignacion.controller.mjs # Lógica de control para las asignaciones (maneja peticiones y respuestas HTTP).
│   ├── dashboard.controller.mjs # Lógica de control para el dashboard.
│   ├── pelicula.controller.mjs   # Lógica de control para las películas.
│   └── salaCine.controller.mjs   # Lógica de control para las salas de cine.
├── repository/
│   ├── asignacion.repository.mjs # Lógica de interacción directa con la base de datos para asignaciones.
│   ├── dashboard.repository.mjs # Lógica de interacción directa con la base de datos para dashboard.
│   ├── pelicula.repository.mjs   # Lógica de interacción directa con la base de datos para películas.
│   └── salaCine.repository.mjs   # Lógica de interacción directa con la base de datos para salas de cine.
├── routes/
│   ├── asignacion.routes.mjs # Define las rutas URL para los endpoints de asignaciones.
│   ├── dashboard.routes.mjs # Define las rutas URL para los endpoints del dashboard.
│   ├── pelicula.routes.mjs   # Define las rutas URL para los endpoints de películas.
│   └── salaCine.routes.mjs   # Define las rutas URL para los endpoints de salas de cine.
├── services/
│   ├── asignacion.service.mjs # Lógica de negocio para asignaciones (procesamiento de datos, coordinación de repository).
│   ├── dashboard.service.mjs # Lógica de negocio para el dashboard.
│   ├── pelicula.service.mjs   # Lógica de negocio para películas.
│   └── salaCine.service.mjs   # Lógica de negocio para salas de cine.
├── .env                    # Archivo para variables de entorno (ej: credenciales de BD, puerto).
├── app.mjs                 # Archivo principal de la aplicación (configura Express, middlewares, rutas generales).
└── package.json            # Define las dependencias del proyecto y scripts de ejecución.


frontend/
└── src/
    └── app/
        ├── core/             # Contiene módulos o lógica transversal a toda la aplicacion
        │   ├── layout/         # Componente principal de layout (sidebar, area de contenido)
        │   │   ├── layout.component.html
        │   │   └── layout.component.ts
        │   └── services/       # Servicios compartidos a nivel de aplicacion (ej: ApiService)
        │       └── api.service.ts
        ├── features/         # Contiene las funcionalidades o "pantallas" principales
        │   ├── assignments/    # Funcionalidad de Asignaciones
        │   │   ├── components/ # Componentes de la feature (ej: AssignmentFormComponent)
        │   │   │   └── assignment-form/
        │   │   │       ├── assignment-form.component.html
        │   │   │       └── assignment-form.component.ts
        │   │   ├── models/     # Interfaces de datos para la feature (ej: Asignacion)
        │   │   │   └── assignments.ts
        │   │   └── services/   # Servicios de la feature (ej: AssignmentService)
        │   │       └── assignment.service.ts
        │   ├── dashboard/      # Funcionalidad del Dashboard
        │   │   ├── components/ # Componentes de la feature (ej: DashboardComponent)
        │   │   │   └── dashboard/
        │   │   │       ├── dashboard.component.html
        │   │   │       └── dashboard.component.ts
        │   │   ├── models/     # Interfaces de datos para la feature (ej: DashboardIndicators)
        │   │   │   └── dashboard.ts
        │   │   └── services/   # Servicios de la feature (ej: DashboardService)
        │   │       └── dashboard.service.ts
        │   ├── movies/         # Funcionalidad de Gestión de Películas
        │   │   ├── components/ # Componentes de la feature (ej: MovieListComponent, MovieFormComponent, MoviesComponent - contenedor)
        │   │   │   ├── movie-form/
        │   │   │   │   ├── movie-form.component.html
        │   │   │   │   └── movie-form.component.ts
        │   │   │   ├── movie-list/
        │   │   │   │   ├── movie-list.component.html
        │   │   │   │   └── movie-list.component.ts
        │   │   │   └── movies/ # Componente contenedor de la feature
        │   │   │       ├── movies.component.html
        │   │   │       └── movies.component.ts
        │   │   ├── models/     # Interfaces de datos para la feature (ej: Pelicula)
        │   │   │   └── movies.ts
        │   │   └── services/   # Servicios de la feature (ej: MovieService)
        │   │       └── movie.service.ts
        │   └── rooms/          # Funcionalidad de Gestión de Salas de Cine
        │       ├── components/ # Componentes de la feature (ej: RoomListComponent, RoomFormComponent, RoomsComponent - contenedor)
        │       │   ├── room-form/
        │       │   │   ├── room-form.component.html
        │       │   │   └── room-form.component.ts
        │       │   ├── room-list/
        │       │   │   ├── room-list.component.html
        │       │   │   └── room-list.component.ts
        │       │   └── rooms/  # Componente contenedor de la feature
        │       │       ├── rooms.component.html
        │       │       └── rooms.component.ts
        │       ├── models/     # Interfaces de datos para la feature (ej: SalaCine, SalaCineStatus)
        │       │   └── rooms.ts
        │       └── services/   # Servicios de la feature (ej: RoomService)
        │           └── room.service.ts
        ├── app.component.css   # Estilos del componente principal de la app
        ├── app.component.html  # Template del componente principal (contiene router-outlet)
        ├── app.component.ts    # Lógica del componente principal de la app
        ├── app.config.ts       # Configuracion de la aplicacion (proveedores, ruteo) - Para Standalone
        ├── app.routes.ts       # Definicion de las rutas de la aplicacion
        ├── index.html          # Página HTML principal (punto de entrada)
        ├── main.ts             # Punto de entrada principal de la aplicacion (bootstrapping)
        └── styles.css          # Estilos globales de la aplicacion (aqui estara Tailwind)