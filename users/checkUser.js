const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3"
});

module.exports = function (req, res) {

    const User = sequelize.define("user", {
        firstName: DataTypes.TEXT,
        lastName: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
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
                let userData = JSON.parse(body);

                User.findOne(
                    {
                        raw: true,
                        where: {
                            email: userData.email,
                        },
                    }
                ).then((data) => {

                    bcrypt.compare(userData.password, data.password, (err, result) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        if (result) {
                            let item = {
                                id: data.id,
                            }

                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify(item.id));

                        } else {
                            console.log('Mot de passe invalide');
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end('no valid')
                        }
                    });
                })


            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}