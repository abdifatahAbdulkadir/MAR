const express = require("express");
const router = express.Router();
const data_base = require("./dataBase.js"); // requiring database file and accessing the mysql queries


router.get("/getAllCalendar/", async(req,res) =>{
    try {
        let dbResult = await data_base.getAllCalendar();
        res.json(dbResult); // response from database will be returned as json
        console.log(dbResult); //print the result to the console
    } catch (error) {
        console.log("JsonError" + error);
        res.send("500");
    }
});



router.get("/news", async(req, res) => {
    try {
        let dbResult = await data_base.module.news();
        res.json(dbResult);
        console.log(dbResult);
    } catch (e) {
        console.log(e);
        res.send("500");
    }
});





module.exports = router;