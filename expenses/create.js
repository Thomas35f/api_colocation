const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3"
});

module.exports = function (req, res) {

    const Expense = sequelize.define("expense", {
        user_id: DataTypes.INTEGER,
        category: DataTypes.TEXT,
        amount: DataTypes.INTEGER,
        from_user: DataTypes.INTEGER,
        to_users: DataTypes.TEXT,
        date: DataTypes.TEXT,
    });

    (async () => {
        await sequelize.sync({ force: false });
        try {
            let body = "";

            // Listen for data event
            req.on("data", (chunk) => {
                console.log(chunk);
                body += chunk.toString();
            });

            // Listen for end event
            req.on("end", async () => {
                let expenseData = JSON.parse(body);

                Expense.create(expenseData).then((data) => {

                    Expense.findAll({ raw: true }).then((data) => {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(data));
                    });
                });



            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}