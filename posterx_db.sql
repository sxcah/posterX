-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 10:13 PM
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
-- Database: `posterx_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `userID` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`userID`, `username`, `password`) VALUES
(1, 'hacxs', '$2y$10$KT4.M44zfEUua5Vb9JxKduK/IafFKu6fMGuD42ynDSrlXRd0w/lqu'),
(2, 'SpyderLounge', '$2y$10$x/OamQtaoC08FXdeszKVcOvRGXjbjiw4mZCxYS256Eccc4apl8Vry'),
(3, '123123123', '$2y$10$7fU5IC2uJ9GFBbfSPx/Hxux3do76oAd4IX6CpFsgn6N1X9uhgA7je'),
(4, 'SpyderLoungee', '$2y$10$df8PpUUoFStUEJ8E9.hTqe1AhfYNUOykcKFjnOxj/hkTs0rJWyQpm'),
(5, 'SpyderLoungeeeee', '$2y$10$Sll1hjtbacx1gcTfS1kT4uoTy1woxYLo4vbQCHFdBcrCdyTMKJToa'),
(6, 'SpyderLounge123', '$2y$10$ZmUc/vLEswAMR7F5aPiUAOn6MrQGDNvf/2OjFdnFlTfgHvvNK3ASa'),
(7, 'Yolo', '$2y$10$4tCOz7lJyvm/15Cah1Ixwe/NpN3Xp3zMk5IFRQaYtZLMK0VOxajXm');

-- --------------------------------------------------------

--
-- Table structure for table `user_information`
--

CREATE TABLE `user_information` (
  `userID` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_information`
--

INSERT INTO `user_information` (`userID`, `email`) VALUES
(1, 'hackedacc3x@gmail.com'),
(2, 'hackedacc5x@gmail.com'),
(3, 'hackedacc35x@gmail.com'),
(4, 'hackedacc533x@gmail.com'),
(5, 'hackedacc5eeex@gmail.com'),
(6, 'hackedac12c5x@gmail.com'),
(7, 'yolo@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user_information`
--
ALTER TABLE `user_information`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_information`
--
ALTER TABLE `user_information`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_account`
--
ALTER TABLE `user_account`
  ADD CONSTRAINT `user_account_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_information` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
