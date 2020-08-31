require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./controllers/usercontroller');
let question = require('./controllers/questioncontroller');
let response = require('./controllers/responsecontroller');
let bountyhunter = require('./controllers/bountyhuntercontroller');

app.use('/lightsaber', function(req, res){
    res.send('The force is strong with this endpoint on the server!');
})
sequelize.sync();
//sequelize.sync({force: true});
app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);
app.use('/question', question);
app.use('/response', response);
app.use('/bountyhunter', bountyhunter);




app.listen(3000, function(){
    console.log('App is listening on port 3000');
})