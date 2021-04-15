const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require('express-session');
const morgan = require("morgan");
const flash = require("req-flash");
const connectFlash = require("connect-flash");
const apiRouter = require("./route");
let user_id; // to identify the logged user

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yasiin98", //write your database password
    database: "calendar", // your database name
    port: 3306,
    connectionLimit: 10
});


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src/views'));
app.use(express.static(__dirname + 'src'));
app.use("/src/images/logo.png" ,express.static('/src/images/logo.png'));





app.use(morgan("short"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/",apiRouter);

app.use(session({
    secret: "ncoweuihcskjdfoi",
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3003/index");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
  });

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

app.get('/about', function(req,res){
    res.sendFile(path.join(__dirname,"./views/about.html"));
});

app.get('/mybookings',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/myBookings.html"));
});

//admin page
app.get('/admin',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/adminPage.html"));
});

app.get('/addArticle',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/addArticle.html"));
});

app.get('/adminBooking',isLoggedIn, function(req,res){
    res.sendFile(path.join(__dirname,"./views/adminBookingTable.html"));
});
//login
app.post("/home", (req,res) => {
    const { email, password } = req.body;
     if(email === "" && password === "") {
        res.render("./login.html",{
            message: ("Please enter Email and Password")
        });
    } else if(email === "" || password === ""){
        res.render("./login.html",{
            message: ("Please enter Email and Password")
        });
    } else {
        if (email && password) {
            connection.query("SELECT * FROM calendar.users WHERE email=? AND password=?", [email, password], function (err, result) {
                if(err){
                    console.log(err);
                    throw err;
                }
                if (result.length > 0) {
                    result.forEach(function (row){
                        if (row.role === "admin") {
                        user_id = row.user_id;
                        req.session.loggedin = true;
                        req.session.email = email;
                        return res.status(200).render("./adminPage.html");
                     } else if (row.role === "user") {
                        user_id = row.user_id;
                        req.session.loggedin = true;
                        req.session.email = email;
                        return res.status(200).render("./index.html");
                    }
                    });
                    
                }
            });
        }
        
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
                } else if(descr === "" && book_date === ""){
                    return res.render("bookingReperation", {
                        message: "Book a Date"
                    });
                }else{
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

        if(name === "" || email === "" || password=== "" || passwordConfirm === ""){
            return res.render("register", {
                message: "Please fill all Fields to register"
            });
        }else if(name === "" && email === "" && password=== "" && passwordConfirm === ""){
            return res.render("register", {
                message: "Field is Empty"
            });
        }else {
            if(!(name === "" && email === "" && password=== "" && passwordConfirm === "")){
                connection.query("INSERT INTO users set ?", {name: name, email: email, password: password}, (err,result) => {
                    if (err) {
                        console.log(err);
                    }else {
                        console.log(result);
                        return res.render("login", {
                            message: "User Registered"
                        });
                    }
                });
            }
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
            return res.render("addArticle");
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
        connection.query("SELECT * FROM calendar.book WHERE user_id =" + user_id, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    console.log(result[0].book_id);
                    res.json(result);
                }
            }
        });
    }
});

app.get("/delete", (req, res) => {
    const book_id = req.query.book_id;
    console.log("--------------> " + book_id); //<------------------------------
    if (!req.session.loggedin) {
        return res.status(401).redirect("./login");
    } else {
        connection.query("DELETE FROM calendar.book WHERE book_id= " + req.query.book_id, function (err, result) {
            if (err) {
                throw err;
            } else {
                res.redirect("./myBookings");
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
app.listen(3003, function() {
    console.log("running server on port 3003");
});
