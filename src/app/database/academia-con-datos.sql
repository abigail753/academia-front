-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: database:3306
-- Tiempo de generación: 14-02-2025 a las 15:12:39
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `academia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `id` bigint NOT NULL,
  `calificacion` decimal(4,2) DEFAULT NULL,
  `fecha_evaluacion` date DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `id_examen` int NOT NULL,
  `id_tema` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`id`, `calificacion`, `fecha_evaluacion`, `id_usuario`, `id_examen`, `id_tema`) VALUES
(1, 3.00, '2025-02-11', 4, 2, 1),
(2, 0.00, '2025-02-12', 2, 22, 2),
(5, 0.00, '2025-02-12', 3, 28, 3),
(6, 0.00, '2025-02-12', 2, 34, 1),
(7, 0.00, '2025-02-12', 3, 35, 3),
(8, 8.00, '2025-02-12', 6, 35, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id` bigint NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Curso 1', 'Este es el curso numero 1'),
(2, 'Curso 1 de Profesor 2', 'Este es un curso de profesor 2'),
(3, 'Curso 2 de profesor 2', 'Este es un curso de profesor 2'),
(4, 'Curso 4 de Profesor 2', 'Otro curso del profesor 2'),
(5, 'Curso 5 de Profesor 2', 'Un curso del profesor 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `id` bigint NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `num_preguntas` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`id`, `nombre`, `num_preguntas`) VALUES
(1, 'Examen 3', 10),
(2, 'Examen 3', 10),
(8, 'adwwd', 12),
(9, 'dfgdg', 12),
(10, 'asads', 12),
(11, 'ascd', 12),
(12, 'qwe', 12),
(13, 'asqw', 12),
(14, 'sadSAas', 5),
(15, 'wew', 5),
(16, 'asdads', 12),
(17, 'dwsasd', 12),
(18, 'sdfsdf', 12),
(19, 'sdfsdf', 12),
(20, 'sdfsd', 12),
(21, 'sfsd', 12),
(22, '1er examen prof1', 10),
(24, '1er Examen de Prof 2', 8),
(26, '1er Examen de Prof 2', 8),
(27, '1er Examen de Prof 2', 8),
(28, '1er Examen de Prof 2', 8),
(29, 'sdas', 8),
(30, 'AAAAAAAAAAAAAAAA', 6),
(31, 'AAAAAAAAAAAAAAAA', 6),
(32, 'AAAAAAAAAAAAAAAA', 6),
(33, 'ASDASD', 12),
(34, 'ASDASD', 12),
(35, 'Programacion prof2', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `id` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `id_curso` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `inscripcion`
--

INSERT INTO `inscripcion` (`id`, `id_usuario`, `id_curso`) VALUES
(1, 2, 1),
(2, 4, 1),
(3, 5, 1),
(4, 3, 2),
(5, 3, 3),
(6, 6, 3),
(7, 6, 3),
(9, 4, 3),
(10, 2, 2),
(11, 3, 2),
(12, 4, 2),
(13, 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tema`
--

CREATE TABLE `tema` (
  `id` bigint NOT NULL,
  `titulo` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `id_curso` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `tema`
--

INSERT INTO `tema` (`id`, `titulo`, `descripcion`, `id_curso`) VALUES
(1, 'Programacion', 'Este es un tema del profesor 1', 1),
(2, 'Tema 2', 'Este es el tema 2 de profesor 1', 1),
(3, 'Tema 1 de Profe 2', 'Tema 1 de Profe 2', 2),
(4, 'Introducción al Curso', 'Se presenta una visión general del curso y sus objetivos.', 1),
(5, 'Fundamentos Teóricos', 'Revisión de los conceptos básicos necesarios para el desarrollo del curso.', 1),
(6, 'Aplicaciones Prácticas', 'Ejercicios y ejemplos para aplicar los conceptos teóricos en la práctica.', 2),
(7, 'Temas Avanzados', 'Profundización en conceptos avanzados y técnicas especializadas.', 2),
(8, 'Proyecto Final', 'Orientación y detalles para la realización del proyecto final del curso.', 3),
(9, 'Conceptos Intermedios', 'Profundización en conceptos intermedios que refuerzan la base teórica.', 1),
(10, 'Implementación Práctica Avanzada', 'Ejercicios prácticos enfocados en casos reales y desafíos tecnológicos.', 2),
(11, 'Estudios de Caso Avanzados', 'Análisis detallado de casos reales para aplicar y extender lo aprendido.', 2),
(12, 'Proyecto de Integración', 'Desarrollo de un proyecto final que integra todos los conocimientos adquiridos.', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `correo` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `foto` longtext CHARACTER SET utf32 COLLATE utf32_unicode_ci,
  `password` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `tipousuario` varchar(255) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellidos`, `correo`, `foto`, `password`, `tipousuario`) VALUES
(1, 'Abigail', 'Bautista', 'admin@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Administrador'),
(2, 'Profesor 1', 'profesor', 'prof1@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Profesor'),
(3, 'Profesor 2', 'profesor', 'prof2@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Profesor'),
(4, 'Alumno 1', 'alum1', 'alum1@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(5, 'Alumno 2', 'alumno', 'alum2@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(6, 'Alumno 3', 'alumno', 'alum3@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(7, 'Alumno 4', 'alumno', 'alum4@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(8, 'Alumno 5', 'alumno', 'alum5@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(9, 'Alumno 6', 'alumno', 'alum6@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(10, 'Alumno 7', 'alumno', 'alum7@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante'),
(11, 'Alumno 8', 'alumno', 'alum8@gmail.com', NULL, '7e4b4f5529e084ecafb996c891cfbd5b5284f5b00dc155c37bbb62a9f161a72e', 'Estudiante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tema`
--
ALTER TABLE `tema`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tema`
--
ALTER TABLE `tema`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
