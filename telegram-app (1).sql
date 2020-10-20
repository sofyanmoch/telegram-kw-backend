-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 12 Okt 2020 pada 07.39
-- Versi Server: 5.7.31-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telegram-app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `sender` text NOT NULL,
  `receiver` text NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `message`
--

INSERT INTO `message` (`id`, `sender`, `receiver`, `message`, `created_at`) VALUES
(85, 'Eimi Fukada', 'sofyan17', 'rumahku sepi nih', '2020-10-08 02:23:15'),
(86, 'sofyan17', 'Eimi Fukada', 'yaudah bakar aja biar rame', '2020-10-08 02:23:29'),
(87, 'Eimi Fukada', 'sofyan17', 'Y', '2020-10-08 02:23:37'),
(88, 'sofyan17', 'Eimi Fukada', 'why?', '2020-10-08 02:23:51'),
(89, 'Eimi Fukada', 'sofyan17', 'G', '2020-10-08 02:23:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refreshToken` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `refreshToken`) VALUES
(24, 'mchsfyan17@gmail.com', 'sofyan17', '$2b$10$5I8wPqMRVEGaFcOpqydZrOTLFw2KeDSO0rccFlGMelPLKAKHCMLNS', 0),
(26, 'nia@gmail.com', 'Nia', '$2b$10$UHNjs6vD6aWQ2pXt248ffOYuYcWt2lWF.RYy/Egm5F3SU6AiEuHe2', 0),
(27, 'eimi@gmail.com', 'Eimi Fukada', '$2b$10$g/JDWj7t.m9GikZgcR.X3.QW6ZAeh.5DH90VXP6Dx83ozwFjAGWtS', 0),
(28, 'alwi@gmail.com', 'yui hatano', '$2b$10$RQc6T/oyAReEul6VP7Vs8u8POw77ZRfm9RIu3kPWqSYLCmbfEibqy', 0),
(29, 'pevita@gmail.com', 'Pevita Pearce', '$2b$10$xWoabKDMQ8GhueIiwNUnwuoJ6LTcpl4kKDhI8qH2ERZBOSkTC7.j6', 0),
(30, 'contoh@gmail.com', 'test1', '$2b$10$Roek1poPWrKFy51oh/o/ve8bcmVlqdKWf92v4ItnHUGusDhg5o4zG', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
