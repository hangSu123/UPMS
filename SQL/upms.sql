-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2018 at 09:12 AM
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
(9, '1', 'presentation Starts date', 'hello everyone we are going to hold an event on 28-02-2018, welcome to join us', '2018-02-28');

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
(1, '1', '1', 'aasd', 1, 2, 'no'),
(2, '1', '2', 'sds', 1, 2, 'no');

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
  `cordinator_id` varchar(50) NOT NULL,
  `cordinator_email_address` varchar(50) DEFAULT NULL,
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

INSERT INTO `coordinator` (`cordinator_id`, `cordinator_email_address`, `first_name`, `last_name`, `phone_number`, `username`, `password`, `salt`) VALUES
('1', 'suhangj123@gmail.com', 'Hang', 'Su', 481393516, 'c1234567', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` int(11) NOT NULL,
  `available_place` int(11) DEFAULT NULL,
  `tutor_email` text,
  `project_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `available_place`, `tutor_email`, `project_id`) VALUES
(1, 1, 'suhangj@hotmail.com', NULL),
(2, 3, 'suhangj@hotmail.com', NULL),
(3, 2, 'suhangj@hotmail.com', NULL),
(4, 2, 'suhangj@hotmail.com', NULL),
(5, 4, 'laim@gmail.com', NULL),
(6, 4, 'laim@gmail.com', NULL),
(7, 4, 'laim@gmail.com', NULL),
(8, 4, 'laim@gmail.com', NULL),
(9, 4, 'laim@gmail.com', NULL),
(10, 4, 'laim@gmail.com', NULL),
(11, 3, 'laim@gmail.com', NULL);

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
(2, 'test 2', 'i am your supervisor, i am Henry, handsome boy', 3, 'hello.pdf', 'B', 'Henry Chen', 'henry123@gmail.com'),
(3, 'new', 'kjdldijfvldif ne ]dsfpsdlk beb ksjd wleif wlekflj elirfjewj oekfeo', 4, 'nihao.pdf', 'B', 'hangsu', 'hangSu@gmail.com');

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
  `group_id` varchar(50) DEFAULT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `email_address`, `first_name`, `last_name`, `GPA`, `major`, `group_id`, `username`, `password`, `salt`) VALUES
('1', 'suhangj@hotmail.com', 'James', 'Zheng', '5.20', 'CS', NULL, 'n9324665', 'd078aabd7822210b547f05d45411e1cfe8871b94b5b35841d35581e6471e4d1d', 'LoiMqxk'),
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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
