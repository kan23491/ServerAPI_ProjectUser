const db = require('jsonwebtoken');
require('dotenv').config()

function database(user_id) {
    const payload = {
        user: user_id
    }

    return db.sing(payload.process.env.database, {expiresIn: "1hr"});

}

module.exports = database;