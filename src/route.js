const express = require("express");
const router = express.Router();
const callDbQuery = require("../src/dataBase"); // requiring database file and accessing the mysql queries


router.get("/getAllCalendar", async(req,res) =>{
    try {
        let dbResult = await callDbQuery.getAllCalendar();
        res.json(dbResult); // response from database will be returned as json
        console.log(dbResult); //print the result to the console
    } catch (error) {
        console.log("JsonError" + error);
        res.send("500");
    }
});

router.get("/getNews", async(req,res) =>{
    try{
        let dbResult = await callDbQuery.news();
        res.json(dbResult);
        console.log(dbResult);
    } catch (error){
        console.log("JsonError" + error);
        res.send("500")
    }
})


router.get("/getUnbookedReperation", async(req,res) =>{
    try {
        let dbResult = await callDbQuery.getUnbookedReperation();
        res.json(dbResult); // response from database will be returned as json
        console.log(dbResult); //print the result to the console
    } catch (error) {
        console.log("JsonError" + error);
        res.send("500");
    }
});


module.exports = router;