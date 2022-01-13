var mysql = require('mysql2');

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

// get all Genres
singpdb.getAll = () => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Genres`, function(err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

// get one Genre
singpdb.getOne = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Genres WHERE id= ${id}`, function(err, result) {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

// insert one Genre
singpdb.insertOne = (genrename) => {
    return new Promise((resolve, reject) => {
        var cnt = con.query(`SELECT count(*) as total FROM Genres`, function(err, result) {
            if (err) return reject(err);
            totalCount = result[0].total;
            console.log(totalCount);
            con.query(`INSERT INTO Genres (id, genrename) VALUES (${totalCount+1}, '${genrename}')`, function(err, result) {
                if (err) return reject(err);
                var msg = "1 record inserted";
                resolve(msg);
            });
            return totalCount;
        });
    });
}

// update one Genre
singpdb.updateOne = (id, genrename) => {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE Genres SET genrename = '${genrename}' WHERE id = ${id}`, function(err, result) {
            if (err) return reject(err);
            var msg = result.affectedRows + " record(s) updated";
            resolve(msg);
        });
    });
}

// delete one Genre
singpdb.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM Genres WHERE id = ${id}`, function(err, result) {
            if (err) return reject(err);
            var msg = "Number of records deleted: " + result.affectedRows;
            resolve(msg);
        });
    });
}

// delete all Genres
singpdb.deleteAll = () => {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM Genres`, function(err, result) {
            if (err) return reject(err);
            var msg = "Number of records deleted: " + result.affectedRows;
            resolve(msg);
        });
    });
}


module.exports = singpdb;