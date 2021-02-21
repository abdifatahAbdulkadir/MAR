const express = require("express");
const router = express.Router();
const callDbQuery = require("./dataBase"); // requiring database file and accessing the mysql queries


router.get("/getAllCalendar/", async(req,res) =>{
    try {
        let dbResult = await callDbQuery.getAllCalendar();
        res.json(dbResult); // response from database will be returned as json
        console.log(dbResult); //print the result to the console
    } catch (error) {
        console.log("JsonError" + e);
        res.send("500");
    }
});

module.exports = router;