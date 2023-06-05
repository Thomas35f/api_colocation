const { Sequelize, Model, DataTypes } = require("sequelize");
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
            ExpenseCategory.findAll(
                {
                    raw: true,
                }).then((data) => {
                    let items = [];
                    for (let i = 0; i < data.length; i++) {
                        items.push({
                            id: data[i].id,
                            title: data[i].title,
                        });
                    }
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(items));
                });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}