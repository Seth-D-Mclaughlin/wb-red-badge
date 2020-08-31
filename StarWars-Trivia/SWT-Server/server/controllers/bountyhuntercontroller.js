const router = require("express").Router();
const BountyHunter = require("../db").import("../models/bountyhunter");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require('../middleware/validate-session');
const bountyhunter = require("../models/bountyhunter");

router.post("/create", validateSession, function(req,res){
    BountyHunter.create({
        name:req.body.bountyhunter.name,
        points:req.body.bountyhunter.points
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

// Get Bounty hunter by name
router.get("/:name", (req,res)=>{
    let name = req.params.name
    BountyHunter.findAll({
        where:{name: name}
    })
    .then(bountyhunters => res.status(200).json(bountyhunters))
    .catch(err=>res.status(500).json({error: err}))
})

// Update Bounty Hunter 
router.put("/update/:name", validateSession, function(req,res){
    const updateBountyHunter ={
        name: req.body.bountyhunter.name
    };
    const query = {where: {name: req.params.name}};
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