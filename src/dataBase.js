const mysql = require("mysql");

// mysql.createPool -> creates a connection with a connectionLimit of '10'
let connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root", //write your database password
    database: "calendar", // your database name
    port: 3306,
    connectionLimit: 10
});

let db = {};

db.getAllCalendar = () => {
    return new Promise((resolve, reject) => {

        //if there is no error then resolve (return) a result
        connection.query("SELECT * FROM calendar_table", function(err, results){
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}


db.getUnbookedReperation = () => {
    return new Promise((resolve, reject) => {

        //if there is no error then resolve (return) a result
        connection.query("SELECT * FROM calendar_table where isBooked='false'", function(err, results){
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}

//ToDo add the delete, update, insert queries below, follow above example ⬆

//? we export the result to be used in other javascript files
//Do so to call the `db.getAllCalendar` from other classes
//const database = require("the path of this file ("/database.js")")
//! database.getAllCalendar();
module.exports = db;