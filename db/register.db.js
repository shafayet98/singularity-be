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


// register methods
// insert one
singpdb.insertOne = (username, email, password, role) => {
    return new Promise((resolve, reject) => {
        var cnt = con.query(`SELECT count(*) as total FROM Users`, function(err, result) {
            if (err) return reject(err);
            totalCount = result[0].total;
            console.log(totalCount);
            bcrypt.hash(password, saltRounds, (err, hash) => {
                con.query(`INSERT INTO Users (id, username, email, password, role) VALUES (${totalCount+1}, '${username}', '${email}', '${hash}', '${role}')`, function(err, result) {
                    if (err) return reject(err);
                    var msg = "1 record inserted";
                    resolve(msg);
                });
            });
            return totalCount;
        });
    });
}
module.exports = singpdb;