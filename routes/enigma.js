const express = require("express");
const router = express.Router();


const isLoggedIn = require("../middlewares");


router.get("/", isLoggedIn, async (req, res, next) => {
    res.render("auth/enigma");
});

module.exports = router;