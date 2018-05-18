const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const api = require('./routes/api')
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', api)

//affiche le msg dans localhost:3000/ 
app.get('/', function(req, res){
    res.send('COUCOU from server')
});

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)
})