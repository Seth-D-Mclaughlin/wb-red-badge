const Sequelize = require('sequelize');
const sequelize = new Sequelize('StarWarsTrivia', 'postgres', 'skywalker', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to StarWarsTrivia postgres database');
    },
    function(err){
        console.log(err);
    }
);

// 
const User = sequelize.import("./models/user");
const BountyHunter = sequelize.import("./models/bountyhunter");
const Response = sequelize.import("./models/response");
const Question = sequelize.import("./models/question");

User.hasMany(BountyHunter);
BountyHunter.belongsTo(User);

BountyHunter.hasMany(Response);
Response.belongsTo(BountyHunter);

//Response.hasOne(Question);
User.hasMany(Question);
Question.belongsTo(User);

module.exports = sequelize;