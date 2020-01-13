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

// connect to the mysql server and sql database, throw error if it doesn't work
connection.connect(function (err) {
    if (err) throw err;
    displayInventory();
});

// list all the products
const productList = 'SELECT *FROM Products';
const displayInventory = function () {
    connection.query(productList, function (err, res) {
        if (err) throw err;

        console.log('Welcome to Bamazon');
        console.log('================================================================');
        for (let i = 0; i > res.length; i++) {
            let inventory = `\n
        ID No.: ${res[i].itemID} | Product: ${res[i].product} | Department: ${res[i].department} | Price: ${res[i].price} | Available: ${res[i].stockQuantity}
        ================================================================`
            console.log(inventory);
        }
        customerPurchase();
        // if (err) {
        //     console.error('error connecting: ' + err.stack);
        //     return;
        // }
        // console.log('connected as id ' + connection.threadId);

    });
}
// prompt user what they'd like to purchase using the id number
const customerPurchase = function () {
    inquirer.prompt([{
            type: "input",
            name: "ID",
            message: "What would you like to purchase? (Type in the ID No.)",
            // must be a number
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "Quantity",
            message: "How many would you like?",
            // must be a number
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        // calculate the cost of everything
    ]).then(function (ans) {
        let query = 'SELECT stock_quantity, price, product, department FROM products WHERE ?';
        connection.query(query, {
            item_id: ans.itemID
        }, function (err, res) {
            if (err) throw err;
            const availability = res[0].stockQuantity;
            const unitPrice = res[0].price;
            const productDepartment = res[0].department;

            // insufficient quantity and prevent order from going through
            if (availability >= ans.stockQuantity) {
                completePurchase(availability, unitPrice, productSales, productDepartment, ans.itemID, ans.stockQuantity);
            } else {
                console.log(`There isn't enough in our inventory! There are only ${stockQuantity} left.`);
                customerPurchase();
            }

        })
    });
}


// is there anything else? y/n

// if else statement. if yes - open list of products; if no - show receipt