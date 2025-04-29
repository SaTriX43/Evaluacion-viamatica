-- Script para crear la base de datos y tablas del proyecto Viamatica Cine
-- Asegurate de tener permisos para crear bases de datos

-- Paso 1: Crear la base de datos (si no existe)
-- CREATE DATABASE viamatica_cine_db;
-- \connect viamatica_cine_db; -- Conectarse a la base de datos recién creada

-- Si necesitas eliminar las tablas primero (para empezar limpio)
-- DROP TABLE IF EXISTS pelicula_salacine;
-- DROP TABLE IF EXISTS pelicula;
-- DROP TABLE IF EXISTS sala_cine;
-- DROP SEQUENCE IF EXISTS pelicula_id_pelicula_seq;
-- DROP SEQUENCE IF EXISTS sala_cine_id_sala_seq;
-- DROP SEQUENCE IF EXISTS pelicula_salacine_id_pelicula_sala_seq;

-- Paso 2: Crear las secuencias para los IDs autoincrementales
CREATE SEQUENCE pelicula_id_pelicula_seq START 1;
CREATE SEQUENCE sala_cine_id_sala_seq START 1;
CREATE SEQUENCE pelicula_salacine_id_pelicula_sala_seq START 1;

-- Paso 3: Crear la tabla 'pelicula'
CREATE TABLE public.pelicula (
    id_pelicula integer PRIMARY KEY DEFAULT nextval('pelicula_id_pelicula_seq'::regclass),
    nombre character varying(255) NOT NULL,
    duracion integer NOT NULL,
    is_deleted boolean DEFAULT false
);

-- Paso 4: Crear la tabla 'sala_cine'
CREATE TABLE public.sala_cine (
    id_sala integer PRIMARY KEY DEFAULT nextval('sala_cine_id_sala_seq'::regclass),
    nombre character varying(255) NOT NULL,
    estado character varying(50), -- Nullable segun tu \d
    is_deleted boolean DEFAULT false -- Añadido segun tu \d, aunque no lo usamos en frontend CRUD
);

-- Paso 5: Crear la tabla 'pelicula_salacine' (Asignaciones)
CREATE TABLE public.pelicula_salacine (
    id_pelicula_sala integer PRIMARY KEY DEFAULT nextval('pelicula_salacine_id_pelicula_sala_seq'::regclass),
    id_sala_cine integer NOT NULL,
    id_pelicula integer NOT NULL,
    fecha_publicacion date NOT NULL,
    fecha_fin date NOT NULL,
    -- Definir las claves foráneas
    FOREIGN KEY (id_sala_cine) REFERENCES public.sala_cine(id_sala) ON DELETE CASCADE,
    FOREIGN KEY (id_pelicula) REFERENCES public.pelicula(id_pelicula) ON DELETE CASCADE
);



-- Datos de Ejemplo

-- Insertar algunas peliculas
INSERT INTO public.pelicula (nombre, duracion, is_deleted) VALUES
('El Origen', 148, false),
('Interstellar', 169, false),
('Matrix', 136, false),
('Pulp Fiction', 154, false),
('El Padrino', 175, false);

-- Insertar algunas salas de cine
INSERT INTO public.sala_cine (nombre, estado, is_deleted) VALUES
('Sala IMAX', 'Disponible', false),
('Sala 1', 'Mantenimiento', false),
('Sala VIP 2', 'Disponible', false),
('Sala 3D', 'Disponible', false);

-- Insertar algunas asignaciones (pelicula_salacine)
-- Asegurate de que los id_pelicula y id_sala_cine existan de los INSERTs anteriores
-- Puedes obtener los IDs despues de insertar con RETURNING id_pelicula, etc.
-- O si la secuencia empieza en 1, asumir IDs 1, 2, 3... si insertaste en ese orden.
-- Asumiremos IDs 1, 2, 3... para este ejemplo:

INSERT INTO public.pelicula_salacine (id_sala_cine, id_pelicula, fecha_publicacion, fecha_fin) VALUES
(1, 1, '2025-05-01', '2025-05-15'), -- El Origen en Sala IMAX
(1, 2, '2025-05-16', '2025-05-31'), -- Interstellar en Sala IMAX
(3, 1, '2025-05-05', '2025-05-20'), -- El Origen en Sala VIP 2
(4, 3, '2025-05-10', '2025-06-10'); -- Matrix en Sala 3D

-- Puedes añadir mas datos si lo deseas