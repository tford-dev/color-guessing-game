const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(4000, ()=>{
    console.log("Running on port 4000");
});