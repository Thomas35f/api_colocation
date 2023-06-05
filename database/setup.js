const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3"
});
const checkRoute = require('../routing.js');

module.exports = function (req, res) {
    const Expense = sequelize.define("expense", {
        user_id: DataTypes.INTEGER,
        category: DataTypes.TEXT,
        amount: DataTypes.INTEGER,
        from_user: DataTypes.INTEGER,
        to_users: DataTypes.TEXT,
        date: DataTypes.TEXT,
    });

    const User = sequelize.define("user", {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
    });

    const ExpenseCategory = sequelize.define("expense_category", {
        title: DataTypes.TEXT,
    });

    (async () => {
        await sequelize.sync({ force: false });
        checkRoute(req, res);
    })();
}