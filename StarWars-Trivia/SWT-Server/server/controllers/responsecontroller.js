const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
const Response = require("../db").import("../models/response");

router.post('/create', validateSession, function(req,res){
    Response.create({
        responses: req.body.responses
    })
    .then(function createSuccess(resp){
        res.json({
            responses: resp,
            message: "Response created successfully!"
        })
    })
    .catch((err) => res.status(500).json({error: err}));
});

// Get all Responses
router.get("/", (req, res) => {
    Response.findAll()
    .then(Responses => res.status(200).json(Responses))
    .catch(err=>res.status(500).json({error: err}))
})


router.get("/:id", (req,res)=>{
    let ResponseId = req.params.id
    Response.findAll({
        where:{id: ResponseId}
    })
    .then(Responses => res.status(200).json(Responses))
    .catch(err=>res.status(500).json({error: err}))
})

router.put("/update/:id", validateSession, function(req,res){
    const updateResponse ={
        responses: req.body.responses
    };
    const query = {where: {id: req.params.id}};
    Response.update(updateResponse, query)
    .then((resp) => res.status(200).json(resp))
    .catch((err)=> res.status(500).json({error: err}));
});

router.delete("/delete/:id", validateSession, function(req,res){
    const query = {where: {id: req.params.id}};

    Response.destroy(query)
    .then(() => res.status(200).json({message: "Response removed"}))
    .catch((err) => res.status(500).json({error: err }));
})

module.exports = router;