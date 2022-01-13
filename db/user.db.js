var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// get all Users
singpdb.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Users`, function(err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

// get one User
singpdb.getOne = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Users WHERE id= ${id}`, function(err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

// insert one User
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

// update one User
singpdb.updateOne = (id, username, role) => {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE Users SET username = '${username}', role = '${role}'  WHERE id = ${id}`, function(err, result) {
            if (err) return reject(err);
            var msg = result.affectedRows + " record(s) updated";
            resolve(msg);
        });
    });
}

// delete one User
singpdb.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM Users WHERE id = ${id}`, function(err, result) {
            if (err) return reject(err);
            var msg = "Number of records deleted: " + result.affectedRows;
            resolve(msg);
        });
    });
}

// delete all Users
singpdb.deleteAll = () => {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM Users`, function(err, result) {
            if (err) return reject(err);
            var msg = "Number of records deleted: " + result.affectedRows;
            resolve(msg);
        });
    });
}


module.exports = singpdb;