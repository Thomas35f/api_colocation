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

                // Check if there is a user with a same email
                User.findOne(
                    {
                        raw: true,
                        where: {
                            email: userData.email
                        },
                    }
                ).then((data) => {
                    if (!data) {
                        bcrypt.hash(userData.password, 10)
                            .then(hash => {
                                userData.password = hash;
                                // Store hash in the database
                                User.create(userData).then((data) => {

                                    User.findAll({ raw: true }).then((data) => {
                                        res.setHeader('Access-Control-Allow-Origin', '*');
                                        res.writeHead(200, { "Content-Type": "application/json" });
                                        res.end(JSON.stringify(data));
                                    });
                                });
                            })
                    } else {
                        console.log('email existant')
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end('email no valid')
                    }
                })

                    .catch(err => {
                        console.log(err)
                    });


            });
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}