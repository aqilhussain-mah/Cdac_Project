-- MySQL Script generated by MySQL Workbench
-- Mon Dec 30 13:18:35 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `User_Id` INT NOT NULL,
  `User_Name` VARCHAR(45) NULL,
  `User_PhnNumber` INT NULL,
  `User_Email` VARCHAR(45) NULL,
  `User_Address` VARCHAR(45) NULL,
  `User_Password` VARCHAR(45) NULL,
  `User_Altr_Number` INT NULL,
  `Role` ENUM('USER', 'ADMIN') NULL,
  PRIMARY KEY (`User_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FunctionHall`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FunctionHall` (
  `FunctionHall_Id` INT NOT NULL,
  `FunctionHall_Name` VARCHAR(45) NULL,
  `FunctionHall_Address` VARCHAR(45) NULL,
  `FunctionHall_Capacity` VARCHAR(45) NULL,
  PRIMARY KEY (`FunctionHall_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Admin` (
  `Admin_Id` INT NOT NULL,
  `Admin_Name` VARCHAR(45) NOT NULL,
  `Admin_Email` VARCHAR(45) NOT NULL,
  `Admin_PhnNumber` INT NULL,
  `Admin_Password` VARCHAR(45) NULL,
  `Role` ENUM('USER', 'ADMIN') NULL,
  `FunctionHall_Id` INT NULL,
  PRIMARY KEY (`Admin_Id`),
  INDEX `FunctonHall_Id_idx` (`FunctionHall_Id` ASC) VISIBLE,
  CONSTRAINT `FK_Admin_FunctionHall`
    FOREIGN KEY (`FunctionHall_Id`)
    REFERENCES `mydb`.`FunctionHall` (`FunctionHall_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Images` (
  `ImageId` INT NOT NULL,
  `Imagedata` BLOB NULL,
  `Image_Name` VARCHAR(45) NULL,
  `Image_Type` ENUM('FUNCTION_HALL', 'FOOD') NULL,
  `FunctionHall_Id` INT NULL,
  PRIMARY KEY (`ImageId`),
  INDEX `FunctionHall_Id_idx` (`FunctionHall_Id` ASC) VISIBLE,
  CONSTRAINT `FK_Images_FunctionHall`
    FOREIGN KEY (`FunctionHall_Id`)
    REFERENCES `mydb`.`FunctionHall` (`FunctionHall_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Food` (
  `Food_Id` INT NOT NULL,
  `Food_ItemName` VARCHAR(45) NULL,
  `Food_IntemType` ENUM('VEG', 'NON-VEG') NULL,
  `Foodcol` VARCHAR(45) NULL,
  PRIMARY KEY (`Food_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FunctionHallFood`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FunctionHallFood` (
  `ID` INT NOT NULL,
  `FunctionHall_Id` INT NULL,
  `Food_Id` INT NULL,
  PRIMARY KEY (`ID`),
  INDEX `FunctionHall_Id_idx` (`FunctionHall_Id` ASC) VISIBLE,
  INDEX `Food_Id_idx` (`Food_Id` ASC) VISIBLE,
  CONSTRAINT `FK_FunctionHallFood_FunctionHall`
    FOREIGN KEY (`FunctionHall_Id`)
    REFERENCES `mydb`.`FunctionHall` (`FunctionHall_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_FunctionHallFood_Food`
    FOREIGN KEY (`Food_Id`)
    REFERENCES `mydb`.`Food` (`Food_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Dates` (
  `Date_Id` INT NOT NULL,
  `Date_Booked` DATE NULL,
  PRIMARY KEY (`Date_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`EventTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`EventTypes` (
  `Event_Id` INT NOT NULL,
  `Event_Type` VARCHAR(45) NULL,
  PRIMARY KEY (`Event_Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Booking` (
  `Booking_Id` INT NOT NULL,
  `User_Id` INT NULL,
  `Date_Id` INT NULL,
  `FunctionalHall_Id` INT NULL,
  `Event_Id` INT NULL,
  PRIMARY KEY (`Booking_Id`),
  INDEX `User_Id_idx` (`User_Id` ASC) VISIBLE,
  INDEX `Date_Id_idx` (`Date_Id` ASC) VISIBLE,
  INDEX `FunctionalHall_Id_idx` (`FunctionalHall_Id` ASC) VISIBLE,
  INDEX `EvenetType_idx` (`Event_Id` ASC) VISIBLE,
  CONSTRAINT `FK_Booking_User`
    FOREIGN KEY (`User_Id`)
    REFERENCES `mydb`.`User` (`User_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Booking_Dates`
    FOREIGN KEY (`Date_Id`)
    REFERENCES `mydb`.`Dates` (`Date_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Booking_FunctionHall`
    FOREIGN KEY (`FunctionalHall_Id`)
    REFERENCES `mydb`.`FunctionHall` (`FunctionHall_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_Booking_EventTypes`
    FOREIGN KEY (`Event_Id`)
    REFERENCES `mydb`.`EventTypes` (`Event_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FunctionEvent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FunctionEvent` (
  `Id` INT NOT NULL,
  `FunctionHall_Id` INT NULL,
  `Event_Id` INT NULL,
  PRIMARY KEY (`Id`),
  INDEX `FunctionHall_Id_idx` (`FunctionHall_Id` ASC) VISIBLE,
  INDEX `Event_Id_idx` (`Event_Id` ASC) VISIBLE,
  CONSTRAINT `FK_FunctionEvent_FunctionHall`
    FOREIGN KEY (`FunctionHall_Id`)
    REFERENCES `mydb`.`FunctionHall` (`FunctionHall_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_FunctionEvent_EventTypes`
    FOREIGN KEY (`Event_Id`)
    REFERENCES `mydb`.`EventTypes` (`Event_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
