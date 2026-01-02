-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 02, 2026 at 08:07 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evangadi_forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `answer_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`answer_id`, `question_id`, `user_id`, `answer`, `created_at`) VALUES
(1, 1, 5, 'JWT is a signed token...', '2026-01-01 23:27:25'),
(2, 1, 5, 'JWT is a signed token...', '2026-01-01 23:27:55'),
(3, 5, 5, 'node js is javascript framework to ru..', '2026-01-02 07:53:06');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `user_id`, `title`, `description`, `tags`, `created_at`) VALUES
(1, 5, 'What is JWT?', 'Can someone explain JWT clearly?', 'authentication,nodejs', '2026-01-01 22:36:22'),
(2, 5, 'What is Reactjs?', 'Can someone explain JWT clearly?', 'authentication,nodejs', '2026-01-01 22:38:04'),
(3, 5, 'What is Reactjs?', 'Can someone explain JWT clearly?', 'authentication,nodejs', '2026-01-01 22:39:52'),
(4, 5, 'What is Bootstrap?', 'Can someone explain JWT clearly?', 'authentication,nodejs', '2026-01-01 22:56:29'),
(5, 6, 'What is Nodejs ?', 'Can someone explain node clearly?', 'authentication,nodejs', '2026-01-02 07:42:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `first_name`, `last_name`, `email`, `password`, `created_at`) VALUES
(1, 'gashaw01', 'Gashaw', 'Getaneh', 'gashaw@gmail.com', '$2b$10$rSC1hfZgYXuKCs4IMsiHIuhXjZTDPHeCcmNB4KAR5g17Gs8K8Zzrm', '2025-12-30 14:19:39'),
(2, 'selom01', 'selomei', 'lamesgin', 'selom@example.com', '$2b$10$/rp9T/FS/LeCbC5h39H7lOze1AzXkeK1f4yOJfLDzXUzbA90IAddC', '2025-12-31 08:02:11'),
(3, 'john', 'John', 'Doe', 'john@gmail.com', '$2b$10$GxuIGRVVWKEPeJj7YAjZjuuFmcWZsimC8HYRiQ2Lg67g6imLROewi', '2025-12-31 19:25:45'),
(4, 'hani01', 'hanna', 'shiferaw', 'hanna@example.com', '$2b$10$2FNzJj9JkGmSc5WaWSiVb.9AbjS4KN6F9gR7Wpo6P1Z2ezWerIckG', '2026-01-01 17:48:52'),
(5, 'fen01', 'fenet', 'ahmed', 'fenet@example.com', '$2b$10$qTgbveRpYBeh59aRpdGJzOXXFQr58UOA9fnwee1hhjmeVoIQixeRO', '2026-01-01 19:18:35'),
(6, 'ermi01', 'ermiyas', 'wordofa', 'ermi@example.com', '$2b$10$5ZPgd.2Q8dOyUs/L2lNCd.ulT00hFDOkPC/67gmzwCfOK0pLmu5Vu', '2026-01-02 07:22:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
