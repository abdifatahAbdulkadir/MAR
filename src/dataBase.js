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
        connection.query(`SELECT * FROM calendar.users`, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}

db.deleteUser = (user_id) => {
    return new Promise ((resolve, reject) =>{
        connection.query("DELETE FROM calendar.users WHERE user_id= " + user_id, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}

//display all booking on admin page
db.getAllBookings = () => {
    return new Promise ((resolve, reject) =>{
        connection.query(`SELECT * FROM calendar.book`, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}

//delete booking one by one on admin page
db.deleteAllBookings = (book_id) => {
    return new Promise ((resolve, reject) =>{
        connection.query("DELETE FROM calendar.book WHERE book_id= " + book_id, function (err,results){
            if(err){
                reject(err);
            } else{
                resolve(results);
            }
        });
    });
}


exports.module = db;