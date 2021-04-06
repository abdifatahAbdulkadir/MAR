const mysql = require("mysql");

// mysql.createPool -> creates a connection with a connectionLimit of '10'
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yasiin98", //write your database password
    database: "calendar", // your database name
    port: 3306,
    connectionLimit: 10,
    insecureAuth : true
});

let db = {};

db.news = () => {
    return new Promise ((resolve, reject) =>{
        connection.query(`SELECT * FROM calendar.news`, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}

db.getAllUser = () => {
    return new Promise ((resolve, reject) =>{
        connection.query(`SELECT user_id, name, email, role FROM calendar.users`, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}

exports.module = db;