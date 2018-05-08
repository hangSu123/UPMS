-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2018 at 03:17 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
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
(8, '1', 'zxfcvbnm', 'asdftgtfrdes', '2018-01-17'),
(9, '1', 'presentation Starts date', 'hello everyone we are going to hold an event on 28-02-2018, welcome to join us', '2018-02-28'),
(10, '1', '122', 'qwasdf', '2018-05-14');

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `application_id` int(11) NOT NULL,
  `group_id` varchar(50) NOT NULL,
  `project_id` varchar(50) NOT NULL,
  `application_link` varchar(255) DEFAULT NULL,
  `group_preference` int(11) DEFAULT NULL,
  `supervisor_preference` int(11) DEFAULT NULL,
  `assigned` enum('yes','no') DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`application_id`, `group_id`, `project_id`, `application_link`, `group_preference`, `supervisor_preference`, `assigned`) VALUES
(1, '2', '2', 'aasd', 1, 3, 'no'),
(2, '1', '2', 'sds', 1, 5, 'yes'),
(3, '1', '4', '260wk01_18.pdf', NULL, NULL, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment_id` int(10) NOT NULL,
  `assignment_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `assignment_weight` int(3) DEFAULT NULL,
  `submission_date` date DEFAULT NULL,
  `CRA_link` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`assignment_id`, `assignment_name`, `assignment_weight`, `submission_date`, `CRA_link`) VALUES
(1, 'Application', 10, '2018-03-23', 'pdfs-17-calculate_visa_end_date.pdf'),
(2, 'final report', 35, '2018-04-26', 'Receipt_2116475800.pdf'),
(3, 'resume', 5, '2018-03-31', '30898328.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `coordinator`
--

CREATE TABLE `coordinator` (
  `coordinator_id` varchar(50) NOT NULL,
  `coordinator_email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coordinator`
--

INSERT INTO `coordinator` (`coordinator_id`, `coordinator_email_address`, `first_name`, `last_name`, `phone_number`, `username`, `password`, `salt`) VALUES
('1', 'suhangj123@gmail.com', 'Hang', 'Su', 481393516, 'c1234567', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` int(11) NOT NULL,
  `available_place` int(11) DEFAULT NULL,
  `tutor_email` text,
  `project_id` varchar(50) DEFAULT NULL,
  `meeting_id` int(11) DEFAULT NULL,
  `demo_meeting_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `available_place`, `tutor_email`, `project_id`, `meeting_id`, `demo_meeting_id`) VALUES
(1, 2, 'suhangj@hotmail.com', '2', NULL, 22),
(2, 3, 'suhangj@hotmail.com', NULL, NULL, NULL),
(3, 2, 'suhangj@hotmail.com', NULL, NULL, 19),
(4, 2, 'suhangj@hotmail.com', NULL, NULL, 19),
(5, 4, 'laim@gmail.com', NULL, NULL, NULL),
(6, 4, 'laim@gmail.com', NULL, NULL, NULL),
(7, 4, 'laim@gmail.com', NULL, NULL, NULL),
(8, 4, 'laim@gmail.com', NULL, NULL, 21),
(9, 4, 'laim@gmail.com', NULL, NULL, NULL),
(10, 4, 'laim@gmail.com', NULL, NULL, NULL),
(11, 3, 'laim@gmail.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `meeting_id` int(50) NOT NULL,
  `type` enum('tutor','demo') DEFAULT NULL,
  `tutor_id` varchar(50) DEFAULT NULL,
  `day` varchar(20) DEFAULT NULL,
  `time` time NOT NULL,
  `duration` int(11) NOT NULL,
  `space_ava` int(11) NOT NULL DEFAULT '4',
  `date` date NOT NULL,
  `room_num` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`meeting_id`, `type`, `tutor_id`, `day`, `time`, `duration`, `space_ava`, `date`, `room_num`) VALUES
(3, 'tutor', 'Hang', 'Monday', '00:21:00', 12, 0, '0000-00-00', NULL),
(4, 'tutor', 'Jerry', 'Monday', '14:23:00', 23, 4, '0000-00-00', NULL),
(5, 'tutor', 'Jerry', 'Tuesday', '14:23:00', 23, 4, '0000-00-00', NULL),
(6, 'tutor', 'Hang', 'Tuesday', '12:03:00', 12, 4, '0000-00-00', NULL),
(13, 'tutor', 'Hang', 'Wednesday', '12:30:00', 30, 0, '0000-00-00', NULL),
(14, 'tutor', 'Hang', 'Wednesday', '12:30:00', 30, 1, '0000-00-00', NULL),
(15, 'tutor', 'Hang', 'Wednesday', '12:30:00', 30, 4, '0000-00-00', NULL),
(16, 'tutor', 'Hang', 'Thursday', '12:30:00', 30, 4, '0000-00-00', NULL),
(17, 'tutor', 'Jerry', 'Friday', '12:30:00', 30, 4, '0000-00-00', NULL),
(18, 'tutor', 'Jerry', 'Monday', '13:30:00', 30, 4, '0000-00-00', NULL),
(19, 'demo', NULL, NULL, '12:34:00', 0, 4, '2018-05-11', 'm123'),
(20, 'demo', NULL, NULL, '15:59:00', 0, 4, '2018-05-14', '234'),
(21, 'demo', NULL, NULL, '13:30:00', 0, 4, '2018-05-11', 't123'),
(22, 'demo', NULL, NULL, '16:23:00', 0, 4, '2018-05-11', 's303'),
(23, 'tutor', 't1234567', 'Tuesday', '10:30:00', 30, 4, '0000-00-00', NULL);

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
(2, 'test 2', 'i am your supervisor, i am Henry, handsome boy', 3, 'hello.pdf', 'B', 'Henry Chen', 'henry123@gmail.com'),
(3, 'new', 'kjdldijfvldif ne ]dsfpsdlk beb ksjd wleif wlekflj elirfjewj oekfeo', 4, 'nihao.pdf', 'B', 'hangsu', 'abel@gmail.com'),
(4, 'Inplace renew project', 'rewriting for current inplace system ', 4, '260wk01_18.pdf', 'A', 'Jerry Wang', 'jerry@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `username` varchar(10) NOT NULL,
  `assignment_id` varchar(255) DEFAULT NULL,
  `mark` decimal(5,2) DEFAULT NULL,
  `submission_date` datetime DEFAULT NULL,
  `submission_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`username`, `assignment_id`, `mark`, `submission_date`, `submission_link`) VALUES
('n9324665', '2', NULL, '2018-05-07 16:04:07', '260wk01_18.pdf'),
('n9326448', '1', '5.00', '2018-05-24 00:00:00', '12345hello.phd');

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
  `group_id` varchar(50) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `email_address`, `first_name`, `last_name`, `GPA`, `major`, `group_id`, `username`, `password`, `salt`) VALUES
('1', 'suhangj@hotmail.com', 'James', 'Zheng', '5.20', 'CS', '1', 'n9324665', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk'),
('2', 'suhangj@gmail.com', 'Hang', 'Su', '5.00', 'CS', '1', 'n9326448', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk');

-- --------------------------------------------------------

--
-- Table structure for table `supervisor`
--

CREATE TABLE `supervisor` (
  `supervisor_id` varchar(50) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supervisor`
--

INSERT INTO `supervisor` (`supervisor_id`, `email_address`, `first_name`, `last_name`, `phone_number`, `username`, `password`, `salt`) VALUES
('1', 'abel@gmail.com', 'Abel', 'Zhang', 456789324, 's1234567', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk');

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `tutor_id` varchar(50) NOT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` int(10) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`tutor_id`, `email_address`, `first_name`, `last_name`, `phone_number`, `username`, `password`, `salt`) VALUES
('1', 'tutor@gmail.com', 'Chen', 'Kuanheng', 856789345, 't1234567', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk');

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
  ADD PRIMARY KEY (`application_id`);

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`assignment_id`);

--
-- Indexes for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`coordinator_id`);

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
  ADD KEY `FK` (`tutor_id`);

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
  ADD PRIMARY KEY (`username`),
  ADD KEY `FK,PK` (`username`,`assignment_id`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `assignment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `meeting_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
