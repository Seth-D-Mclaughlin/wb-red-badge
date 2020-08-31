const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateSession = require("../middleware/validate-session");
const Question = require("../db").import("../models/question");

router.post('/create', validateSession, function(req,res){
    Question.create({
        questions: req.body.questions
    })
    .then(function createSuccess(quest){
        res.json({
            questions: quest,
            message: "Question created successfully!"
        })
    })
    .catch((err) => res.status(500).json({error: err}));
});

// Get all Questions
router.get("/", (req, res) => {
    Question.findAll()
    .then(questions => res.status(200).json(questions))
    .catch(err=>res.status(500).json({error: err}))
})


router.get("/:id", (req,res)=>{
    let questionId = req.params.id
    Question.findAll({
        where:{id: questionId}
    })
    .then(questions => res.status(200).json(questions))
    .catch(err=>res.status(500).json({error: err}))
})

router.put("/update/:id", validateSession, function(req,res){
    const updateQuestion ={
        questions: req.body.questions
    };
    const query = {where: {id: req.params.id}};
    Question.update(updateQuestion, query)
    .then((quest) => res.status(200).json(quest))
    .catch((err)=> res.status(500).json({error: err}));
});

router.delete("/delete/:id", validateSession, function(req,res){
    const query = {where: {id: req.params.id}};

    Question.destroy(query)
    .then(() => res.status(200).json({message: "Question removed"}))
    .catch((err) => res.status(500).json({error: err }));
})

module.exports = router;