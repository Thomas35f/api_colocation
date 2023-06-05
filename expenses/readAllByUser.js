const { Sequelize, Model, DataTypes } = require("sequelize");
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
            let id = req.url.split("/")[2];

            Expense.findAll(
                {
                    raw: true,
                    where: {
                        user_id: id
                    },
                }
            ).then((data) => {

                let items = [];
                for (let i = 0; i < data.length; i++) {
                    items.push({
                        id: data[i].id,
                        category: data[i].category,
                        amount: data[i].amount,
                        from_user: data[i].from_user,
                        to_users: data[i].to_users,
                        date: data[i].date,
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