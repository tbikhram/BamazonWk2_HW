CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE Products(
	Item_ID INT(4) NOT NULL AUTO_INCREMENT,
	Product_name VARCHAR(40) NOT NULL,
	Department_name VARCHAR(40) NOT NULL,
	Price DECIMAL(10, 2) NOT NULL,
	Stock_quantity INT(10) NULL,
	PRIMARY KEY (Item_ID)
);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Ipad Pro', 'Electronics', 699.99, 1);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('MacBook Pro', 'Electronics', 2599.99, 10);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('MacBook Air', 'Electronics', 1099.99, 70);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Playstation 4', 'Games', 259.99, 9);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('HeadPhones', 'Sound', 2599.99, 10);

INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('GO PRO', 'Electronics', 499.99, 10);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Uncharted 4', 'Games', 59.99, 20);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Frozen', 'Movies', .99, 20);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Fantasic Mr.FOX', 'Movies', 9.99, 3);
INSERT INTO Products (Product_name, Department_name, Price, Stock_quantity) 
	VALUES ('Macbook', 'Electronics', 1299.99, 10);
    
    
SELECT * FROM Products;