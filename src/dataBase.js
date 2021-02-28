const mysql = require("mysql");

// mysql.createPool -> creates a connection with a connectionLimit of '10'
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yasiin98", //write your database password
    database: "temp", // your database name
    port: 3306,
    connectionLimit: 10
});

/* connection.login = function (email, password) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM temp.users WHERE email=? AND password=?", [email,password], function(err,result){
            if (err) {
                reject(err);
            }else {
                resolve(result);
            }
        });
    });
} */

exports.module = connection;