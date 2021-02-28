const mysql = require("mysql");

// mysql.createPool -> creates a connection with a connectionLimit of '10'
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //write your database password
    database: "getNews", // your database name
    port: 3306,
    connectionLimit: 10,
    insecureAuth : true
});

connection.login = function (email, password) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM temp.users WHERE email=? AND password=?", [email,password], function(err,result){
            if (err) {
                reject(err);
            }else {
                resolve(result);
            }
        });
    });
}

db.news = () => {
    return new Promise ((resolve, reject) => {

        connection.query("SELECT * FROM getNews.news", function (err,results){
            if(err){
                reject(err)
            } else{
                resolve(results)
            }
        })
    })
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

exports.module = connection;