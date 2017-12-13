-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2017 at 03:10 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
DROP DATABASE IF EXISTS `upms`;
CREATE DATABASE `upms`;
USE `upms`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `upms`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE IF NOT EXISTS `announcements` (
  `Id` int(11) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `title` text NOT NULL,
  `content` longtext NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`Id`, `userId`, `title`, `content`, `date`) VALUES
(1, '1', 'assignment 1', 'hello test 1', '2017-12-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE TABLE `Student` (
  `student_id` varchar(10),
  `email_address` varchar(50),
  `first_name` varchar(50),
  `last_name` varchar(50),
  `GPA` decimal(3,2),
  `major` ENUM('CS','IS','UNKONW'),
  `group_id` varchar(50),
  PRIMARY KEY (`student_id`),
  KEY `FK` (`group_id`)
);

CREATE TABLE `Application` (
  `group_id` varchar(50),
  `project_id` varchar(50),
  `application_link` varchar(255),
  `group_preference` int,
  `supervisor_preference` int,
  KEY `FK,PK` (`group_id`, `project_id`)
);

CREATE TABLE `Project` (
  `project_id` varchar(50),
  `project_name` varchar(255),
  `simple_description_link` varchar(255),
  `out_line_link` varchar(255),
  `difficulty_level` ENUM('A','B','C'),
  `conrdinator_id` varchar(50),
  `supervisor_id` varchar(50),
  PRIMARY KEY (`project_id`),
  KEY `FK` (`conrdinator_id`, `supervisor_id`)
);

CREATE TABLE `Tutor` (
  `tutor_id` varchar(50),
  `email_address` varchar(50),
  `first_name` varchar(50),
  `last_name` varchar(50),
  `phone_number` int(10),
  PRIMARY KEY (`tutor_id`)
);

CREATE TABLE `Meeting` (
  `meeting_id` varchar(50),
  `type` ENUM('A','B','C'),
  `group_id` varchar(50),
  `tutor_id` varchar(50),
  `data_time` datetime,
  PRIMARY KEY (`meeting_id`),
  KEY `FK` (`group_id`, `tutor_id`)
);

CREATE TABLE `Coordinator` (
  `cordinator_id` varchar(50),
  `cordinator_email_address` varchar(50),
  `first_name` varchar(50),
  `last_name` varchar(50),
  `phone_number` int(10),
  PRIMARY KEY (`cordinator_id`)
);

CREATE TABLE `Supervisor` (
  `supervisor_id` varchar(50),
  `email_address` varchar(50),
  `first_name` varchar(50),
  `last_name` varchar(50),
  `phone_number` int(10),
  PRIMARY KEY (`supervisor_id`)
);

CREATE TABLE `Group` (
  `group_id` varchar(50),
  `available_place` int,
  `project_id` varchar(50),
  PRIMARY KEY (`group_id`),
  KEY `FK` (`project_id`)
);

CREATE TABLE `Assignment` (
  `assignment_id` varchar(255),
  `assignment_name` varchar(255),
  `assignment_weight` decimal(5,2),
  `submission_date` datetime,
  `CRA_link` varchar(255),
  PRIMARY KEY (`assignment_id`)
);

CREATE TABLE `Result` (
  `student_id` varchar(10),
  `assignment_id` varchar(255),
  `mark` decimal(5,2),
  `submission_date` datetime,
  `feedback_link` varchar(255),
  KEY `FK,PK` (`student_id`, `assignment_id`)
);

