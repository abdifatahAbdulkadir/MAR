const express = require("express");
const router = express.Router();
const data_base = require("./dataBase.js"); // requiring database file and accessing the mysql queries

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

router.get("/allUsers", async(req, res) => {
    try {
        let dbResult = await data_base.module.getAllUser();
        res.json(dbResult);
        console.log(dbResult);
        
    } catch (e) {
        console.log(e);
        res.send("500");
    }
});

//delete user from admin panel
router.get("/deleteUser", async(req, res) => {
    const user_id = req.query.user_id;
    try {
        let dbResult = await data_base.module.deleteUser(user_id);
        res.redirect("./admin");
        console.log(dbResult);
        
    } catch (e) {
        console.log(e);
    }
});

router.get("/getAllBookings", async(req, res) => {
    try {
        let dbResult = await data_base.module.getAllBookings();
        res.json(dbResult);
        console.log(dbResult);
        
    } catch (e) {
        console.log(e);
        res.send("500");
    }
});

//delete user from admin panel
router.get("/deleteAllBookings", async(req, res) => {
    const book_id = req.query.book_id;
    try {
        let dbResult = await data_base.module.deleteAllBookings(book_id);
        res.redirect("./admin");
        console.log(dbResult);
        
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;