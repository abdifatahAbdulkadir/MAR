const { response } = require("express");
const express = require("express");
const app = express();
const apiRoute = require("./route"); // this will specify the route of the data from route.js 
const path = require("path");


app.use(express.static("public"));
app.use(express.json());
app.use("/", apiRoute);


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(2000, function() {
    console.log("running server on port 2000");
    
});