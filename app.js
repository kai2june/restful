var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var db;
if(process.env.ENV == 'test')
    mongoose.connect('mongodb://localhost/bookAPI_test');
else
    mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
app.get('/', function(req,res){
    res.send('Welcome to my API');
});
app.listen(port, function(){
    console.log("We're on port "+ port);
});
module.exports = app;
