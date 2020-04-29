const db = require("jsonwebtoken");
require("dotenv").config()

module.exports = async (request, response, next) => {
    try {
        const dbtoken = request.header('token');

        if(!dbtoken) {
            return response.status(403).json("Not Auth");
        }

        const payload = db.verify(dbtoken, process.env.jwtSecret)

        request.user.payload.user;
    } catch (error) {
        console.error(err.message);
        return response.status(403).json("Not Auth");
    }
};