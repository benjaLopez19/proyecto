-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2021 a las 05:37:38
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `idUsuario` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `calificacion`
--

INSERT INTO `calificacion` (`idUsuario`, `idProducto`, `calificacion`) VALUES
(1, 1, 2),
(1, 2, 4),
(2, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Cosmetic'),
(3, 'Hat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `productoKey` int(11) NOT NULL,
  `usuarioKey` varchar(200) NOT NULL,
  `contenido` varchar(400) NOT NULL,
  `nombreUsuario` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `idProductos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`idProductos`)),
  `idUsuario` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idProductos`, `idUsuario`) VALUES
(13, '[{\"id\":1,\"cantidad\":23},{\"id\":2,\"cantidad\":4}]', 'donwea@live.cl'),
(14, '[{\"id\":1,\"cantidad\":23},{\"id\":2,\"cantidad\":4}]', 'donwea@live.cl'),
(15, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl'),
(16, '[{\"id\":1,\"cantidad\":1},{\"id\":3,\"cantidad\":1}]', 'admin@mail.cl'),
(17, '[{\"id\":1,\"cantidad\":7},{\"id\":3,\"cantidad\":6}]', 'admin@mail.cl'),
(18, '[{\"id\":1,\"cantidad\":2}]', 'admin@mail.cl'),
(19, '[{\"id\":1,\"cantidad\":4},{\"id\":3,\"cantidad\":2},{\"id\":21,\"cantidad\":2}]', 'admin@mail.cl'),
(21, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl'),
(22, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl'),
(23, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl'),
(24, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl'),
(25, '[{\"id\":1,\"cantidad\":1}]', 'admin@mail.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `calificacion` int(11) DEFAULT 0,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `precio` int(11) NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `stock`, `calificacion`, `nombre`, `descripcion`, `categoria`, `precio`, `imagen`) VALUES
(1, 2, 10, 'Ghastly Gibus', 'Spooky ', 'hat', 2000, '../../../assets/img/ghostlyGibus.png'),
(3, 1, 20, 'starboard crusader', 'jojo reference', 'hat', 10000, '../../../assets/img/starboardCrusader.png'),
(21, 10, 10, 'Spine Chilling Skull', 'Express your undying hatred.', 'hat', 420, '../../../assets/img/spineChilling.png'),
(22, 5, 15, 'Brown Bomber', 'Canada\'s signature', 'hat', 400000, '../../../assets/img/brownBomber.png'),
(23, 5, 15, 'Defiant Spartan', 'SPARTA!!!!', 'hat', 400000, '../../../assets/img/defiantSpartan.png'),
(24, 5, 15, 'The Alien Cranium', 'Watch your back.', 'hat', 400000, '../../../assets/img/alienCranium.png'),
(25, 5, 15, 'The Wraith Wrap', 'Lay waste to all that oposses you.', 'hat', 400000, '../../../assets/img/wraithWrap.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(200) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `comuna` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `RUT` varchar(12) NOT NULL,
  `direccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `nombre`, `apellido`, `clave`, `region`, `comuna`, `admin`, `RUT`, `direccion`) VALUES
('admin@mail.cl', 'Benjamin', 'Lopez', '81dc9bdb52d04dc20036dbd8313ed055', 'Región de Tarapacá', 'Camiña', 1, '12-2', 'Olmos 295'),
('benja323_patricio_@hotmail.com', 'Don', 'wea', '052a1a3c0142ad636571f88ea2506eac', 'region', 'comuna', 0, '31561456', 'Olmos 295'),
('benja_patricio_@hotmail.com', 'Benjamin', 'Lopez', '202cb962ac59075b964b07152d234b70', 'region', 'comuna', 0, '123', 'Olmos 295'),
('correo@mail.cl', 'gatosqls', 'holi', '81dc9bdb52d04dc20036dbd8313ed055', 'valparaiso', 'limache', 0, '11.111.111-1', 'callexweaeaweawea'),
('cosdrreo@mail.cl', 'gatosqls', 'holi', '81dc9bdb52d04dc20036dbd8313ed055', 'valparaiso', 'limache', 0, '11.111.111-1', 'callexweaeaweawea'),
('donwea@live.cl', 'Tanta', 'Corneta', '81dc9bdb52d04dc20036dbd8313ed055', 'region', 'comuna', 0, '111111111', 'direccion'),
('hotmail@wea.cl', 'TuMama', 'biba', '202cb962ac59075b964b07152d234b70', 'Región de Antofagasta', 'María Elena', 0, '12302302', 'conchetumare');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`idUsuario`,`idProducto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
