const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require('express-session');
const morgan = require("morgan");
const flash = require("req-flash");
const connectFlash = require("connect-flash");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yasiin98", //write your database password
    database: "temp", // your database name
    port: 3306,
    connectionLimit: 10
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src/views'));



app.use(morgan("short"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(connectFlash());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname, "./views/register.html"));
}); 

//gets the path to login file on the URL field --> localhost:2000/
app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname,"./views/login.html"));
});
//app.use(express.static(publicDirectory));
0

//login
app.post("/auth", (req,res) => {
    const { email, password } = req.body;
    if(email && password) {
        connection.query("SELECT * FROM temp.users WHERE email=? AND password=?", [email,password], function(err,result){
            if(result.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                return res.status(200).render("./index.html");
            }else {
                res.render("./login.html",{
                    message: ("Incorrect email and/or Password!")
                });
            }
            res.end();
        });
    } else if(email === "" && password === "") {
        res.render("./login.html",{
            message: ("Please enter Email and Password")
        });
    } else if(email === "" || password === ""){
        res.render("./login.html",{
            message: ("Please enter Email and Password")
        });
    } else {
        res.res.render("./login.html",{
            message: "Please Enter your email and Password!"
         });
        res.end();
    }

});


//sign up
app.post("/register", (req,res) => {
    const {name, email, password, passwordConfirm} = req.body;
    connection.query("SELECT email FROM temp.users WHERE email = ?", [email], async(err,result)=> {
        if (err) {
            console.log(err);
        }else{
            if (result.length > 0) {
                return res.render("register", {
                    message: "Email is already in use"
                });
            }else if(password !== passwordConfirm){
                return res.render("register", {
                    message: "Unmatched Password"
                });
            } 
        }

        if(!(name === "" && email === "" && password=== "" && passwordConfirm === "")){
        connection.query("INSERT INTO temp.users set ?", {name: name, email: email, password: password}, (err,result) => {
            if (err) {
                console.log(err);
            }else {
                console.log(result);
                return res.render("register", {
                    message: "User Registered"
                });
            }
        });
        } else if(name === "" || email === "" || password=== "" || passwordConfirm === ""){
            return res.render("register", {
                message: "Please fill all Fields to register"
            });
        } else {
            return res.render("register", {
                message: "Field is Empty"
            });
       }
    });
});

app.get("/index", function(req,res) {
    if (req.session.loggedin) {
        //res.send("Welcome back, " + req.session.email + "!");
        return res.status(200).render("./index.html");
    }else {
        console.log("----> Not allowed login first");
        res.send("Please login to view the page");
    }
    res.end();
});




//start server
app.listen(2000, function() {
    console.log("running server on port 2000");
    
});