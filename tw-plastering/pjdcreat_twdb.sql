-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 09, 2018 at 04:09 PM
-- Server version: 10.0.31-MariaDB-cll-lve
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pjdcreat_twdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `constractors`
--

CREATE TABLE IF NOT EXISTS `constractors` (
  `constractor_id` int(11) NOT NULL AUTO_INCREMENT,
  `constractor_name` varchar(255) NOT NULL,
  PRIMARY KEY (`constractor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=66 ;

--
-- Dumping data for table `constractors`
--

INSERT INTO `constractors` (`constractor_id`, `constractor_name`) VALUES
(60, 'johno'),
(63, 'Kiah'),
(64, 'Hulk'),
(65, 'Planet');

-- --------------------------------------------------------

--
-- Table structure for table `empolyees`
--

CREATE TABLE IF NOT EXISTS `empolyees` (
  `employee_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=119 ;

--
-- Dumping data for table `empolyees`
--

INSERT INTO `empolyees` (`employee_name`, `employee_id`) VALUES
('Callum', 101),
('Hammer', 104),
('Doyly', 105),
('Hayden', 106),
('Tom', 107),
('Jesse', 114),
('Will', 117),
('Bailey', 118);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job_type` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `builder` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quoted` float(255,0) DEFAULT NULL,
  `hours` int(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `special_note` varchar(255) DEFAULT NULL,
  `assign_constractor` int(1) DEFAULT '0',
  `assign_employee` int(1) DEFAULT '0',
  `color` varchar(10) DEFAULT '#ff0000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=151 ;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `job_type`, `address`, `builder`, `description`, `quoted`, `hours`, `start_date`, `end_date`, `special_note`, `assign_constractor`, `assign_employee`, `color`) VALUES
(113, 'New job', 'Torquay', 'Spike', 'Hang and Stop', NULL, NULL, NULL, NULL, NULL, 1, 1, '#09a6ef'),
(131, 'New job', 'Balmoral Rippleside', 'Geelong Constructions', 'Huge', NULL, NULL, NULL, NULL, NULL, 1, 0, '#b609ef'),
(132, 'Quoted', '20 Eureka St, Geelong West', 'Ted Fitz', 'labour only, sq set throughout, front room cornice of owners choice, stopping beads to windows, entry & front bedroom hourly if works are required\nDylan Hang Contract- 470 m re, 40 m villa, 50 battens, suspend front room, metal to windows- Total- 2,435\nEs', 10, NULL, NULL, NULL, 'Materials- $0\nGST- $1070\nHang- $2435\nExpected profit margin 20%- $2,140\nStopping labour- $5000 or under', 1, 0, '#076692'),
(133, 'Quoted', '7 Warwick St, Newtown', 'Geoff Mc Mahon', 'sq set throughout, windows in main room reveal, sliders reveals ( supplied by owners or its extra )\nPom', 33, NULL, NULL, NULL, NULL, 0, 0, '#09a6ef'),
(139, 'New job', 'Pt Henry Rd Moolap', 'Magelin', 'Up stairs- suspended ceiling. Walls hang and stop.\nDownstairs- Hang and stop everything.\nA few extras have been added that needs to be looked at.', NULL, NULL, '2018-02-14', '2018-03-02', NULL, 0, 1, '#1fd811'),
(140, 'New job', 'Nicholas St (Mayzes)', 'True Design', 'All finished just the stairwell for Kiah to finish.', 0, 0, '2018-02-22', '2018-02-26', '', 0, 0, '#8d2b23'),
(141, 'New job', '8 Bride Port St South Melbourne', 'Hayden Gross', 'Front room needs to be hung and stopped.\nEntry needs to be corniced.\nSome bits and pieces through out.', 0, 0, '2018-02-22', '2018-03-27', '', 0, 0, '#10b344'),
(142, 'Completed', '8 Vincent St Drumcondra', 'Nick Madden', 'Upstairs needs to be sanded. \nWaiting on downstairs', 0, 0, '2018-02-28', '2018-03-05', '', 0, 1, '#09ff00'),
(143, 'New job', 'Cairns Ave Newtown', 'Modern Heritage', 'Stop entire house', NULL, NULL, '2018-02-23', '2018-03-16', NULL, 0, 1, '#164927'),
(144, 'New job', 'Anakie Rd', 'Magelin', 'Suspend ceiling and stop front part', 0, 0, '2018-02-22', '2018-03-30', '', 0, 0, '#8d2b23'),
(145, 'New job', 'Belmont Hotel', 'Simon Farrel', 'Rip down and re hang one wall over prick in lounge area of pub.', 0, 0, '2018-02-26', '2018-03-29', '', 0, 0, '#efec09'),
(147, 'Completed', 'Townsend Rd Newcombe', 'Mantec', 'Hang and Stop 6 rooms. Easy Peazy.', 0, 0, '2018-02-21', '2018-02-26', '', 1, 0, '#f2ff00'),
(148, 'New job', '33 Sheridan St Hamlyn Heights', 'Mantec', 'All hung. Planet is stopping up on contract.', 0, 0, '2018-02-19', '2018-03-05', '', 1, 1, '#ef8609'),
(149, 'New job', 'Giles Drive Bannockburn', 'Desbo', 'Big Clip and hang for Pom and crew.\nContract stop out', 0, 0, '2018-02-21', '2018-03-28', '', 0, 0, '#efec09'),
(150, 'New job', 'Dreamcrest -testing', 'Manesh', 'testing job', 150, 10, '2018-03-10', '2018-03-12', 'FYI testing', 1, 1, '#076692');

-- --------------------------------------------------------

--
-- Table structure for table `job_constractors`
--

CREATE TABLE IF NOT EXISTS `job_constractors` (
  `job_id` int(11) NOT NULL,
  `constractor_id` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` float NOT NULL DEFAULT '0',
  `constractor_description` varchar(255) DEFAULT NULL,
  `item` varchar(255) DEFAULT NULL,
  `item_text1` varchar(255) DEFAULT NULL,
  `item_text2` varchar(255) DEFAULT NULL,
  `item_price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `job_constractors`
--

INSERT INTO `job_constractors` (`job_id`, `constractor_id`, `id`, `price`, `constractor_description`, `item`, `item_text1`, `item_text2`, `item_price`) VALUES
(147, '64', 40, 6, 'Hulk Stop Contract', '13mm Metres', '3', '2', '6'),
(148, '65', 41, 10, 'Planet stop contract', '9mm Metres', '5', '2', '10'),
(150, '63', 42, 150, 'testing', '9mm Metres', '15', '10', '150');

-- --------------------------------------------------------

--
-- Table structure for table `job_employees`
--

CREATE TABLE IF NOT EXISTS `job_employees` (
  `job_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=139 ;

--
-- Dumping data for table `job_employees`
--

INSERT INTO `job_employees` (`job_id`, `employee_id`, `id`) VALUES
(148, 0, 133),
(148, 0, 134),
(142, 104, 135),
(143, 106, 136),
(139, 104, 137),
(150, 104, 138);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2017_06_16_154200_create_constrator_table', 1),
('2017_06_16_155906_create_empolyees_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('kss', 'baldo');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
