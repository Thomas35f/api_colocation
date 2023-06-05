const createUser = require("./users/create.js");
const checkUser = require("./users/checkUser.js");
const readAllUsers = require("./users/readAll.js");
const readOneUser = require("./users/readOne.js");
const deleteUser = require("./users/delete.js");

const createExpense = require("./expenses/create.js");
const deleteExpense = require("./expenses/delete.js");
const readAllExpenses = require("./expenses/readAll.js");
const readExpensesByUser = require("./expenses/readAllByUser.js");

const createExpenseCategory = require("./expense-categories/create.js");
const getExpenseCategories = require("./expense-categories/readAll.js");
const getOneExpenseCategory = require("./expense-categories/readOne.js");
const deleteExpenseCategory = require("./expense-categories/delete.js");

module.exports = function (req, res) {

    // USERS
    if (req.url === "/users" && req.method === "GET") {
        // readAllUsers
        readAllUsers(req, res);
    }

    else if (req.url.match(/\/users\/\d+$/) && req.method === "GET") {
        // get the user with the specified id
        readOneUser(req, res);
    }

    if (req.url === "/users" && req.method === "POST") {
        // create a user
        createUser(req, res);
    }

    else if (req.url === "/checkUser" && req.method === "POST") {
        // check user
        checkUser(req, res);
    }

    else if (req.url.match(/\/users\/\d+/) && req.method === "DELETE") {
        // delete the user with the specified id
        deleteUser(req, res);
    }

    //EXPENSES
    else if (req.url === "/expenses" && req.method === "GET") {
        // read all expenses
        readAllExpenses(req, res);
    }

    else if (req.url.match(/\/expenses-by-user\/\d+$/) && req.method === "GET") {
        // get the user with the specified id
        readExpensesByUser(req, res);
    }

    else if (req.url.match(/\/expenses-delete\/\d+/) && req.method === "POST") {
        // delete one expense with the specified id
        console.log('aaa')
        deleteExpense(req, res);
    }

    else if (req.url === "/expenses" && req.method === "POST") {
        // create an expense
        createExpense(req, res);
    }

    //EXPENSE CATEGORIES
    else if (req.url === "/expense-categories" && req.method === "GET") {
        // get all expenses categories
        getExpenseCategories(req, res);
    }

    else if (req.url.match(/\/expense-categories\/\d+$/) && req.method === "GET") {
        // get one expense category
        getOneExpenseCategory(req, res);
    }

    else if (req.url === "/expense-categories" && req.method === "POST") {
        // create an expense category
        createExpenseCategory(req, res);
    }

    else if (req.url.match(/\/expense-categories\/\d+/) && req.method === "DELETE") {
        // delete the expense category with the specified id
        deleteExpenseCategory(req, res);
    }

}