var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');

//connection to mysql Bamazon_db;

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root", 
	password:"School1313",
	database: "Bamazon_db"
})

connection.connect(function(err){
	if(err) throw err;
	runBamazon_db();

})

//variables from the mysql table created 

var next = false;
var Item_ID;
var Product_name;
var Department_name;
var Price;
var Stock_quantity;
var Inventory;
//var next = false;


// this will run when the connection is made to mysql database or table
// these are also all the functions that will be run  questions are asked
// and the imformation is displayed 

var runBamazon_db = function(){

	var query = 'SELECT * FROM Bamazon_db';
	connection.query(query, function(error, response){
		showStock();
			}.then(function(answer){
				//ask user the procduct they would like
				idRequest();
			}).then(function(answer){
				//ask how much they would like (quantity)
				quantityRequest();
			}).then(function(answer){
				//this will check how many is in stock
				checkStock();
			}).then(function(){
				//this will show the cost of  what the user chose
				confirmOrder();
			})
	)
}