<?php

require_once ('conf.inc.php');
require_once ('connection.php');

$connection = newConnection ($CFG);

$prefix = $connection->prefix;

$query = <<<EOL

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Table `{$prefix}user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}user` ;

CREATE TABLE IF NOT EXISTS `{$prefix}user` (
`user_id` INT NOT NULL AUTO_INCREMENT ,
`first_name` VARCHAR(60) NOT NULL ,
`last_name` VARCHAR(60) NOT NULL ,
`email` VARCHAR(255) NOT NULL ,
`grad_yr` SMALLINT NULL ,
`last_online` DATE NULL ,
`student_id` VARCHAR(60) NOT NULL ,
`image_url` TEXT NULL COMMENT 'profile pic\\n\\nurl to the image relative to installation\\\'s resource directory, or from the web?' ,
PRIMARY KEY (`user_id`) ,
INDEX `grad_yr` (`grad_yr` ASC) ,
INDEX `last_name` (`last_name` ASC) ,
UNIQUE INDEX `student_id` (`student_id` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}book` ;

CREATE TABLE IF NOT EXISTS `{$prefix}book` (
`book_id` INT NOT NULL AUTO_INCREMENT ,
`title` VARCHAR(255) NULL ,
`ISBN` VARCHAR(45) NULL ,
`author_firstname` VARCHAR(60) NULL ,
`author_lastname` VARCHAR(60) NULL ,
`publisher` VARCHAR(128) NULL ,
`year_published` SMALLINT NULL ,
`place_published` VARCHAR(45) NULL ,
`other_data` VARCHAR(45) NULL COMMENT 'editors, translators, resources, etc.' ,
`image_url` TEXT NULL COMMENT 'url to the image relative to installation\\\'s resource directory, or from the web?' ,
PRIMARY KEY (`book_id`) ,
INDEX `isbn` (`ISBN` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}listing`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}listing` ;

CREATE TABLE IF NOT EXISTS `{$prefix}listing` (
`listing_id` INT NOT NULL AUTO_INCREMENT ,
`user_id` INT NOT NULL ,
`book_id` INT NOT NULL ,
`description` TEXT NULL ,
`bargainable` TINYINT(1) NOT NULL ,
`open` TINYINT(1) NOT NULL ,
`price` FLOAT(99,2) NOT NULL COMMENT 'The price the seller offers (and when you haggle over the price)' ,
`date` DATETIME NOT NULL ,
`pickup` VARCHAR(45) NOT NULL COMMENT 'How to physically get the book,\\n\\ne.g.(\\\"Tuesday 4th period front of O\\\'Donnell bring money) stuff like that' ,
`confirmed` TINYINT(1) NOT NULL COMMENT 'if seller accepts an offer, buyer has to confirm it for purchase to be final' ,
`num_notifications` SMALLINT NULL COMMENT 'the number of notifications the offer has. Once the owner of the offer visits the page this gets set to 0.' ,
`image_url` TEXT NULL COMMENT 'url to the image relative to installation\\\'s resource directory, or from the web?' ,
PRIMARY KEY (`listing_id`, `user_id`, `book_id`) ,
INDEX `fk_sell_offer_user_idx` (`user_id` ASC) ,
INDEX `fk_sell_offer_book_idx` (`book_id` ASC) ,
INDEX `open` (`open` ASC) ,
CONSTRAINT `fk_sell_offer_user`
FOREIGN KEY (`user_id` )
REFERENCES `user` (`user_id` )
ON DELETE CASCADE
ON UPDATE NO ACTION,
CONSTRAINT `fk_sell_offer_book`
FOREIGN KEY (`book_id` )
REFERENCES `book` (`book_id` )
ON DELETE RESTRICT
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}bid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}bid` ;

CREATE TABLE IF NOT EXISTS `{$prefix}bid` (
`bid_id` INT NOT NULL AUTO_INCREMENT ,
`user_id` INT NOT NULL ,
`listing_id` INT NOT NULL COMMENT 'If the corresponding sell_offer is deleted, the buy_offer will still show up on the user\\\'s own page but say \\\"Sell Offer removed by user\\\" or seomthing' ,
`offered_price` FLOAT(99,2) NULL COMMENT 'The price the buyer offers (when you haggle over the price)' ,
`notes` TEXT NULL ,
`accepted` TINYINT(1) NOT NULL COMMENT 'If offer was accepted or not' ,
`num_notifications` SMALLINT NULL COMMENT 'the number of notifications the offer has. Once the owner of the offer visits the page this gets set to 0.' ,
PRIMARY KEY (`bid_id`, `user_id`, `listing_id`) ,
INDEX `fk_buy_offer_user_idx` (`user_id` ASC) ,
INDEX `fk_buy_offer_sell_offer_idx` (`listing_id` ASC) ,
CONSTRAINT `fk_buy_offer_user`
FOREIGN KEY (`user_id` )
REFERENCES `user` (`user_id` )
ON DELETE CASCADE
ON UPDATE NO ACTION,
CONSTRAINT `fk_buy_offer_sell_offer`
FOREIGN KEY (`listing_id` )
REFERENCES `listing` (`listing_id` )
ON DELETE SET NULL
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}notifications`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}notifications` ;

CREATE TABLE IF NOT EXISTS `{$prefix}notifications` (
`text` TEXT NULL ,
`user_id` INT NOT NULL ,
`sent` TINYINT NOT NULL DEFAULT 0 ,
PRIMARY KEY (`user_id`) ,
INDEX `fk_setting_user` (`user_id` ASC) ,
CONSTRAINT `fk_setting_user1`
FOREIGN KEY (`user_id` )
REFERENCES `user` (`user_id` )
ON DELETE CASCADE
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}login_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}login_info` ;

CREATE TABLE IF NOT EXISTS `{$prefix}login_info` (
`password` VARCHAR(255) NOT NULL ,
`user_id` INT NOT NULL ,
PRIMARY KEY (`user_id`) ,
INDEX `fk_login_info_user_idx` (`user_id` ASC) ,
CONSTRAINT `fk_login_info_user`
FOREIGN KEY (`user_id` )
REFERENCES `user` (`user_id` )
ON DELETE CASCADE
ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `{$prefix}course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}course` ;

CREATE TABLE IF NOT EXISTS `{$prefix}course` (
`course_id` INT NOT NULL ,
`name` VARCHAR(45) NOT NULL ,
`teacher` VARCHAR(45) NOT NULL ,
PRIMARY KEY (`course_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `{$prefix}course_has_book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `{$prefix}course_has_book` ;

CREATE TABLE IF NOT EXISTS `{$prefix}course_has_book` (
`course_course_id` INT NOT NULL ,
`book_book_id` INT NOT NULL ,
PRIMARY KEY (`course_course_id`, `book_book_id`) ,
INDEX `fk_course_has_book_book1_idx` (`book_book_id` ASC) ,
INDEX `fk_course_has_book_course1_idx` (`course_course_id` ASC) ,
CONSTRAINT `fk_course_has_book_course1`
FOREIGN KEY (`course_course_id` )
REFERENCES `course` (`course_id` )
ON DELETE NO ACTION
ON UPDATE NO ACTION,
CONSTRAINT `fk_course_has_book_book1`
FOREIGN KEY (`book_book_id` )
REFERENCES `book` (`book_id` )
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;

 

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
EOL;

if ($result = $connection->multi_query($query)) {

	do{
		if ($result) echo ("Completed!!\n");

	} while ($result = $connection->next_result());
} else {
	echo ("Ben Chan failed in writing the SQL code!!!! $connection->connect_error");
}

$connection->close();
?>