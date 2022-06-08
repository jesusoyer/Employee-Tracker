DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE department (department_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(30));

CREATE TABLE role (role_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(30), salary DECIMAL,  department_ID INT, FOREIGN KEY (department_ID) REFERENCES department(department_ID));

CREATE TABLE employee (employee_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,first_name VARCHAR(30), last_name VARCHAR(30), role_ID INT , manager_ID INT, FOREIGN KEY(role_ID) REFERENCES role(role_ID));
