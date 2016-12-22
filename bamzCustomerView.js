var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
//this will add a table to the terminal with the product list 
var Table =     require('cli-table');

//connection to mysql Bamazon_db;

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root", 
	password:"School1313",
	database: "Bamazon_db"
})


  connection.connect(function(err) {
        if (err) throw err;
        console.log('connected as id' + connection.threadId + '\n\n');
        start();
    });



 // this will connect to mysql and look for all products and add a table with product in it
 var start = function() {
        connection.query('SELECT * FROM Products', function(err, res) {
            console.log('---------------------------------');
            console.log('Available Bamazon Products');
            console.log('---------------------------------');

            //this will return the data from Bamazon_db and put  sql data in a table
            var table = new Table({
                head: ['Item_ID', 'Product_name', 'Price', 'Stock_quantity'],
                colWidths: [10, 40, 10, 10]
            });
          	// for loop created to cycle through product list id's
            for (var i=0; i < res.length; i++) {
                var productArray = [res[i].Item_ID, res[i].Product_name, res[i].Price, res[i].Stock_quantity];
                table.push(productArray);
            }
            console.log(table.toString());
            buyItem();
        });
    };

      //this is where the user will be prompted to pick an item by id
    var buyItem = function() {
        inquirer.prompt([{
            name: "Item",
            type: "input",
            message: "Please pick the ID of the Item you would like to buy",
            validate: function(value) {

                //this will check the answer 
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nPlease enter only the item ID\n");
                    return false;
                }
            }
        },

            //here it will ask for the quantity that is needed 
            {
            name: "Qty",
            type: "input",
            message: "What is the quantity you would like to buy?",
            validate: function(value) {
                //this will check the answer 
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nPlease enter a valid quantity\n");
                    return false;
                }
            }
        }]).then(function(answer) {
            var ItemInt = parseInt(answer.Qty);

            //this will query the database
            connection.query("SELECT * FROM Products WHERE ?", [{Item_ID: answer.Item}], function(err, data) {
                if (err) throw err;

                //Checks if sufficient quantity exists
                if (data[0].Stock_quantity < ItemInt) {
                    console.log("Product is currently out of stock\n");
                    console.log("Please choose another product\n");
                    start();
                } else {

                    //updates database if product exist and not out of stock
                    var updateQty = data[0].Stock_quantity - ItemInt;
                    var totalPrice = data[0].Price * ItemInt;
                    connection.query('UPDATE products SET Stock_quantity = ? WHERE Item_ID = ?', [updateQty, answer.Item], function(err, results) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("Purchase complete!\n");
                            console.log("Your total is: $ " + totalPrice);

                           	//if the buyer wants to continue
                            // the buyer will be able to buy more if they would like to continue
                            inquirer.prompt({
                                name: "buyMore",
                                type: "confirm",
                                message: "Would you like to buy another product?",
                            }).then(function(answer) {
                                if (answer.buyMore === true) {
                                    start();
                                } else {
                                    console.log("Thank your for shopping with Us at Bamazon!");
                                    connection.end();
                                }
                            });
                        }
                    });
                }
            });
        });
    };



// connection.connect(function(err){
// 	if(err) throw err;
// 	runBamazon_db();

// })

// //variables from the mysql table created 

// var next = false;
// var Item_ID;
// var Product_name;
// var Department_name;
// var Price;
// var Stock_quantity;
// var Inventory;
// //var next = false;


// // this will run when the connection is made to mysql database or table
// // these are also all the functions that will be run  questions are asked
// // and the imformation is displayed 

// var runBamazon_db = function(){

// 	var query = 'SELECT * FROM Bamazon_db';
// 	connection.query(query, function(err, res){
// 		showStock();
// 			}.then(function(answer){
// 				//ask user the procduct they would like
// 				idRequest();
// 			}).then(function(answer){
// 				//ask how much they would like (quantity)
// 				quantityRequest();
// 			}).then(function(answer){
// 				//this will check how many is in stock
// 				checkStock();
// 			}).then(function(){
// 				//this will show the cost of  what the user chose
// 				confirmOrder();
// 			})
// 	)
// }


// // this will display the items 

// var showStock = function() {
// 	console.log("Products that are avialable:");
// //here we will be able to loop through the products that are available 
// 	for(var i=0; i<res.length; i++) {
// 		console.log(
// 			"Item_ID: " + res[i].Item_ID +
// 			"|| Products:" + res[i].Product_name + 
// 			"|| Price:" + res[i].Price +
// 			"|| Quantity:" + res[i].Inventory

		

// 		);
// 	}
// }

// //here the user will be asked which product they would like to buy
// var idRequest = function() {
// 	inquirer.prompt({
// 		// WHAT ARE THE RULES FOR THE NAME?
// 		name: 		"itemID",
// 		type: 		"input",
// 		message: 	"Please enter the ID number of the product would you like:",
// 	})
// }





