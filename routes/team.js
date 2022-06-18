const express = require('express');
const Team = require('../models/Team-model');
const User = require('../models/User-model');
const router = express.Router();

router.get("/create", async (req, res, next) => {
    const users = await User.find({});
    res.render("team/new-team", {users});
});

router.get("/", async (req, res, next) => {
    const teams = await Team.find({});
    res.render("team/team-list", {teams});
})

router.get("/:teamId", async (req, res, next) => {
    const {teamId} = req.params;
    try {
        const team = await Team.findById(teamId).populate("participants");
        res.render("team/team-details", {team});
        console.log(team)
    } catch (error) {
        
    } 
})

router.post("/create", async (req, res, next) => {
    const {name, participants} = req.body
    try {
        await Team.create({name, participants});
        res.redirect("/team");
    } catch (error) {
        next(error);
    }
});





module.exports = router;