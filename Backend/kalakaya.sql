-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2026 at 10:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kalakaya`
--

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `photo_url` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `cv` text DEFAULT NULL,
  `exhibitions` text DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `birth_year` smallint(6) DEFAULT NULL,
  `death_year` smallint(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`id`, `full_name`, `photo_url`, `bio`, `cv`, `exhibitions`, `nationality`, `birth_year`, `death_year`, `email`, `website`, `created_at`, `updated_at`) VALUES
(1, 'sanju', '/uploads/artists/photos/1777275326173-62654135.png', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', '/uploads/artists/cvs/1777275326197-608614915.pdf', 'empty', 'nepali', 2003, NULL, 'nepmotors.official@gmail.com', 'sanjayakumargiri.com.np', '2026-04-27 13:20:26', '2026-04-27 13:22:54'),
(2, 'Subash Giri', '/uploads/artists/photos/1777276794258-57472881.png', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', '/uploads/artists/cvs/1777276794281-916870116.pdf', NULL, 'indian', 2024, NULL, 'subash@gmail.com', 'subash.com.np', '2026-04-27 13:44:54', '2026-04-27 13:44:54');

-- --------------------------------------------------------

--
-- Table structure for table `arts`
--

CREATE TABLE `arts` (
  `id` int(10) UNSIGNED NOT NULL,
  `artist_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(500) NOT NULL,
  `year` varchar(20) DEFAULT NULL,
  `medium` text DEFAULT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `enquire` text DEFAULT NULL,
  `exhibited` text DEFAULT NULL,
  `publication` text DEFAULT NULL,
  `provenance` text DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `status` enum('available','sold','on_loan','not_for_sale') NOT NULL DEFAULT 'available',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `arts`
--

INSERT INTO `arts` (`id`, `artist_id`, `title`, `year`, `medium`, `dimensions`, `image_url`, `description`, `enquire`, `exhibited`, `publication`, `provenance`, `price`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'glass', '2020', 'oil', '22*22', '/uploads/art/1777275387223-932382392.png', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 200.00, 'available', '2026-04-27 13:21:27', '2026-04-27 13:23:29'),
(2, 2, 'Painting', '2056', 'canvas', '22*22', '/uploads/art/1777276852420-20957694.jpg', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 'Everything else is correct. Without the error handler, if someone uploads a PDF to the art image endpoint or exceeds the 10MB limit, Express would return an ugly HTML error page instead of JSON — which would cause your frontend to crash trying to parse the response.', 222.00, 'sold', '2026-04-27 13:45:52', '2026-04-27 13:45:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `arts`
--
ALTER TABLE `arts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_arts_artist_id` (`artist_id`),
  ADD KEY `idx_arts_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `arts`
--
ALTER TABLE `arts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arts`
--
ALTER TABLE `arts`
  ADD CONSTRAINT `fk_arts_artist` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
