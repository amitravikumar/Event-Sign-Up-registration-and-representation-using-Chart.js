const { Sequelize } = require('sequelize');

const eventDb = new Sequelize(process.env.DB_URL);

(async() => {
    try{
        await eventDb.authenticate();
        console.log("The connection has been established successfully");
    }catch (error) {
        console.error("Unable to connect to the database", error)
    }
})();

module.exports = eventDb;