const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const api = require('./routes/api');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

//affiche le msg dans localhost:3000/ 
app.get('/', function(req, res){
    res.send('Server works');
});

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT);
});