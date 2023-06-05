const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3"
});

module.exports = function (req, res) {

    const ExpenseCategory = sequelize.define("expense_category", {
        title: DataTypes.TEXT,
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
                let expenseCategoryData = JSON.parse(body);

                ExpenseCategory.create(expenseCategoryData).then((data) => {

                    ExpenseCategory.findAll({ raw: true }).then((data) => {
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