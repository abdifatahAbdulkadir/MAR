const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require('express-session');
const morgan = require("morgan");
const flash = require("req-flash");
const connectFlash = require("connect-flash");
const apiRouter = require("./route");
let user_id;
let book_id;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", //write your database password
    database: "calendar", // your database name
    port: 3306,
    connectionLimit: 10
});


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src/views'));





app.use(morgan("short"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/",apiRouter);

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
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

app.get('/newArticle', isLoggedIn, function(req, res) {
	res.sendFile(path.join(__dirname,"./views/newArticle.html"));
});

app.get('/home',isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname,"./views/index.html"));    
});

app.get('/about',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/about.html"));
});

app.get('/mybookings',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/myBookings.html"));
});

//DELETE BOOKING

app.post("/deleteBooking",(req,res)=>{
const {book_id}=req.body;
console.log(req.body);
if(req.session,loggedin){
    connection.query("DELETE from calendar where book_id=?",[book_id],function(err,result){
        if(err){
           console.log(err);
            res.render("./index.html", {message:("booking deleted")});

        }
    });
}
});

//login
app.post("/home", (req,res) => {
    const { email, password } = req.body;
    if(email && password) {
        connection.query("SELECT * FROM calendar.users WHERE email=? AND password=?", [email,password], function(err,result){
            if(result.length > 0) {
                user_id = result[0].user_id;
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

app.get('/logout', function(req, res) {
    // remove the req.user property and clear the login session
    if (req.session.email){
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    }

    req.session.destroy(err => {
        console.log(err);;
    });

    res.redirect("./login");
  });

app.get('/bookingReperation', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "./views/bookingReperation.html"));
});

//bookingReperation
app.post("/bookingReperation", (req, res) => {
    const { book_date, descr } = req.body;
    if (req.session.loggedin) {

        connection.query("SELECT book_date FROM calendar.book WHERE book_date = ?", [book_date], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    return res.render("bookingReperation", {
                        message: "Date is already in use"
                    });
                } else {
                    if (!(descr === "" && book_date === "")) {
                        connection.query("INSERT INTO calendar.book set ?", { descr: descr, book_date: book_date, user_id }, (err, result) => {
                            if (err) {
                                console.log(err);
                                
                            } else {
                                return res.render("index", {
                                    message: "Booking Registered"
                                });
                            }
                        });
                    }
                }
            }
        });
 
    }
});

//sign up
app.post("/register", (req,res) => {
    const {name, email, password, passwordConfirm} = req.body;
    connection.query("SELECT email FROM users WHERE email = ?", [email], (err,result)=> {
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
        connection.query("INSERT INTO users set ?", {name: name, email: email, password: password}, (err,result) => {
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

app.post("/newArticle", (req, res) => {
    const {title, description} = req.body;
    const date = new Date();

    if(!(title === "" && description === "")){
    connection.query("INSERT INTO calendar.news set ?", {title: title, description: description, date}, (err,result) => {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            return res.render("index");
        }
    });
   }
});

app.get("/index", isLoggedIn,function(req,res) {
  
        //res.send("Welcome back, " + req.session.email + "!");
        return res.status(200).render("./index.html");

});


app.get("/booked",(req, res, next) => {
    if (!req.session.loggedin) {
        return res.status(401).redirect("./login");
    } else {

        console.log("User_id --> " + user_id);
                connection.query("SELECT *  FROM calendar.book WHERE user_id =" + user_id, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result.length > 0) {
                            res.json(result);
                        }
                    }

                });

    }
});


function isLoggedIn(req, res, next) {
    if (!req.session.loggedin) {
        return res.status(401).redirect("./login");
    } else {
        next();
    }
}



//start server
app.listen(3000, function() {
    console.log("running server on port 3000");
});