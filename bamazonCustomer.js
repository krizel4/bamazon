// basis of app: Amazon-like storefront. Take in orders and deplete stock from the store's inventory.

const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection for the sql db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_DB'
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack0);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// list all the products

// prompt user what they'd like to purchase using the id number

// quantity of purchase (must be a number)

// is there anything else? y/n

// if else statement. if yes - open list of products; if no - show receipt