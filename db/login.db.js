var mysql = require('mysql2');
const bcrypt = require('bcrypt');


const saltRounds = 10;

// database connection
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "singdb",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

let singpdb = {};


// login methods
// check login
singpdb.checkLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT id, email, password FROM Users WHERE email = '${email}'`, function(err, result) {
            if (err) return reject(err);
            if (result.length == 0) {
                return reject(err);
            } else {
                if (!bcrypt.compareSync(password, result[0]["password"])) {
                    return reject(err);
                } else {
                    msg = "Authenticated";
                    return resolve(result);
                }
            }
        });
    });
}

module.exports = singpdb;