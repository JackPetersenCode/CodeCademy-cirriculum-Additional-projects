const db = require("./pooldb");

const createUser = (user) => {
    db.query('INSERT INTO users (username, googleid) VALUES ($1, $2)', [user.username, user.googleid], (error, results) => {
        if (error) {
            throw error
        }
    })
    return user;
}

const checkForUser = (user) => {
    db.query('SELECT * FROM users WHERE googleid = user.googleid', [user.googleid], (error, results) => {
        if (error) {
            return false;
        }
    })
    return false;
}

const getById = (id) => {
    db.query('SELECT * FROM users WHERE googleid = id', [id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            return results.rows;
        }
    })
}

/*const checkForUser = (req, res) => {
    let body = req.body;
    console.log(body);
    db.query('SELECT * FROM users WHERE googleid = $1', [body.googleid], (error, results) => {
        if (error) {
            res.status(404).send();
        }
        res.status(200).json(results.rows)
    })
}*/



module.exports = { createUser, checkForUser, getById };