const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");



app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});





app.listen(2000, function() {
    console.log("running server on port 2000");
    
});