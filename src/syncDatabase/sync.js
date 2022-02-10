const sequelize = require("../database/database");

sequelize
    .sync({ alter: false })
    .then()
    .catch((err) => {
        console.log(err);
    });
