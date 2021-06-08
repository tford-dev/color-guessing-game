const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const favicon = require("serve-favicon");

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public/'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// app.listen(4000, ()=>{
//     console.log("Running on port 4000");
// });

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Project Color Guessing Game is now online")
});
