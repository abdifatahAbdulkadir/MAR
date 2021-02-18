var mysql=require('mysql');
const dbcon=mysql.createConnection({
host:'localhost',
user:'root',
password:'root',

database:'calendar'
});
var sql="select * from calendar_table where isBooked='false'";

const e = require('express');
const express = require('express');
const db = require('./dataBase');
const app = express();
app.use(express.urlencoded({ extended: true }));
const serverPort=4000;


app.get("/getUnbookedTimes",(req,res)=>{
console.log("got a request");
sendDb(dbcon,res);


});

function sendDb(dbcon,res){
dbcon.query(sql,function(err,result){
    if(err) throw err;
    
    res.json(result);
});
}

app.listen(serverPort, ()=>{
    console.log("listening on port "+serverPort);
    });
