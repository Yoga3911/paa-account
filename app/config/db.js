const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        logging: process.env.NODE_ENV === "production"? false : console.log
    },
)
module.exports = sequelize