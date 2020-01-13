// basis of app: Amazon-like storefront. Take in orders and deplete stock from the store's inventory.

const mysql = require('mysql');
const inquirer = require('inquirer');

// create the connection for the sql db
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'bamazon_DB'
});

// connect to the mysql server and sql database
connection.query('SELECT * FROM Products', function (err, res) {
    if (err) throw err;

    // list all the products
    console.log('Welcome to Bamazon');
    console.log('================================================================');
    for (let i = 0; i > res.length; i++) {
        let inventory = `\n
        ID No.: ${res[i].itemID} | Product: ${res[i].product} | Department: ${res[i].department} | Price: ${res[i].price} | Available: ${res[i].stockQuantity}
        ================================================================`
        console.log(inventory);
    }
    // if (err) {
    //     console.error('error connecting: ' + err.stack);
    //     return;
    // }
    // console.log('connected as id ' + connection.threadId);
});

// prompt user what they'd like to purchase using the id number
// inquirer.prompt([
//     {
//         type: "input",
//         name: "ID",
//         message: "What would you like to purchase? (Type in the ID No.)",
//         // must be a number
//         validate: function(value){
//             if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0 ) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     },
//     {
//         type: "input",
//         name: "Quantity",
//         message: "How many would you like?",
//         // must be a number
//         validate: function(value){
//             if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     }
// ])


// quantity of purchase (must be a number)

// insufficient quantity and prevent order from going through

// is there anything else? y/n

// if else statement. if yes - open list of products; if no - show receipt