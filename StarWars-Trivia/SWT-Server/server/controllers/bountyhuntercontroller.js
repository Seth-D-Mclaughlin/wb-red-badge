const router = require("express").Router();
const BountyHunter = require("../db").import("../models/bountyhunter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require('../middleware/validate-session');
const bountyhunter = require("../models/bountyhunter");

router.post("/create", validateSession, function(req,res){
    console.log(req.body)
    BountyHunter.create({
        name:req.body.bountyhunter.name,
        points:req.body.bountyhunter.points,
        userId:req.user.id
    })
    .then(function createSuccess(bh){
        res.json({
            bountyhunter:bh,
            message: "Bounty Hunter created successfully!"
        })
    })
    .catch((err) => res.status(500).json({error: err}));   
});


// Get all Bounty hunters
router.get("/", (req, res) => {
    BountyHunter.findAll()
    .then(bountyhunters => res.status(200).json(bountyhunters))
    .catch(err=>res.status(500).json({error: err}))
})

// Get Bounty hunter by userId
router.get("/1", validateSession, (req,res)=>{
    let userId = req.user.id;
    BountyHunter.findAll({
        where:{userId: userId}
    })
    .then(bountyhunters => res.status(200).json(bountyhunters))
    .catch(err=>res.status(500).json({error: err}))
})

// Update Bounty Hunter 
router.put("/update", validateSession, function(req,res){
    const updateBountyHunter ={
        points: req.body.bountyhunter.points
    };
    const query = {where: {userId: req.user.id}};
    BountyHunter.update(updateBountyHunter, query)
    .then((bh) => res.status(200).json(bh))
    .catch((err)=> res.status(500).json({error: err}));
});

//Deleting a bounty hunter
router.delete("/delete/:name", validateSession, function(req,res){
    const query = {where: {name: req.params.name}};

    BountyHunter.destroy(query)
    .then(() => res.status(200).json({message: "Bounty Hunter Defeated (Removed)"}))
    .catch((err) => res.status(500).json({error: err }));
})



//Get highest points
// router.get("/top", (req,res) =>{
//     let point = req.bountyhunter.points
//     BountyHunter.findAll({
//         where: {
//              points: point > 0
//         }
//     })
//     .then(bountyhunters=> res.status(200).json(bountyhunters))
//     .catch(err=>res.status(500).json({error: err}))

// })

module.exports = router;