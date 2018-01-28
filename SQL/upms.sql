-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2018 at 01:43 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


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

CREATE TABLE `announcements` (
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
(1, '1', 'assignment 1', 'hello test 1', '2017-12-08'),
(2, '1', 'assignment 2', 'Assignment to is due on the 23-12-2017, please refer to the submission doc for more detail ', '2017-12-13'),
(3, '1', 'dxfsd', 'dfgfh', '2017-12-27'),
(4, '1', 'sddg', 'dgdgfdfg', '2017-12-19'),
(5, '1', 'test only', 'awdasd', '2017-12-19'),
(6, '1', 'asdas', 'asdasdasda', '2017-11-23'),
(7, '1', 'asdasda', 'ASDasd', '2017-11-07'),
(8, '1', 'zxfcvbnm', 'asdftgtfrdes', '2018-01-17');

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `group_id` varchar(50) DEFAULT NULL,
  `project_id` varchar(50) DEFAULT NULL,
  `application_link` varchar(255) DEFAULT NULL,
  `group_preference` int(11) DEFAULT NULL,
  `supervisor_preference` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment_id` varchar(255) NOT NULL,
  `assignment_name` varchar(255) DEFAULT NULL,
  `assignment_weight` decimal(5,2) DEFAULT NULL,
  `submission_date` datetime DEFAULT NULL,
  `CRA_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `coordinator`
--

CREATE TABLE `coordinator` (
  `cordinator_id` varchar(50) NOT NULL,
  `cordinator_email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` varchar(50) NOT NULL,
  `available_place` int(11) DEFAULT NULL,
  `project_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `meeting_id` varchar(50) NOT NULL,
  `type` enum('A','B','C') DEFAULT NULL,
  `group_id` varchar(50) DEFAULT NULL,
  `tutor_id` varchar(50) DEFAULT NULL,
  `data_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `simple_description` varchar(255) DEFAULT NULL,
  `space_available` int(11) NOT NULL,
  `out_line_link` text,
  `difficulty_level` enum('A','B','C') DEFAULT NULL,
  `super_name` varchar(50) DEFAULT NULL,
  `supervisor_email` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `simple_description`, `space_available`, `out_line_link`, `difficulty_level`, `super_name`, `supervisor_email`) VALUES
(1, 'final test', 'thisis a test, test only ', 4, 'hello.pdf', 'C', 'Hang Su', 'suhangj123@gmail.com'),
(2, 'test 2', 'i am your supervisor, i am Henry, handsome boy', 3, 'hello.pdf', 'B', 'Henry Chen', 'henry123@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `student_id` varchar(10) DEFAULT NULL,
  `assignment_id` varchar(255) DEFAULT NULL,
  `mark` decimal(5,2) DEFAULT NULL,
  `submission_date` datetime DEFAULT NULL,
  `feedback_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(10) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `GPA` decimal(3,2) DEFAULT NULL,
  `major` enum('CS','IS','UNKONW') DEFAULT NULL,
  `group_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `supervisor`
--

CREATE TABLE `supervisor` (
  `supervisor_id` varchar(50) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `tutor_id` varchar(50) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD KEY `FK,PK` (`group_id`,`project_id`);

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`assignment_id`);

--
-- Indexes for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`cordinator_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `FK` (`project_id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`meeting_id`),
  ADD KEY `FK` (`group_id`,`tutor_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `FK` (`super_name`,`supervisor_email`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD KEY `FK,PK` (`student_id`,`assignment_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `FK` (`group_id`);

--
-- Indexes for table `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`supervisor_id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`tutor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
