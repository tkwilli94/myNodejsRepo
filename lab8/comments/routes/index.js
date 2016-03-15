var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB'); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Comment: String
});

var quoteSchema = mongoose.Schema({
  Quote: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model
var Quote = mongoose.model('Quote', quoteSchema);

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.post('/quote', function(req,res, next) {
  console.log("POST quote route");
  console.log(req.body);

  var newQuote = new Quote(req.body);
  console.log(newQuote);
  newQuote.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route");
  console.log(req.body);
  
 var newcomment = new Comment(req.body); //[3]
  console.log(newcomment); //[3]
  newcomment.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.get('/quote', function(req, res, next) {
  console.log("In the quote GET route");
  Quote.find(function(err,quoteList) {
    if(err) return console.error(err);
    else {
      console.log(quoteList);
      res.json(quoteList);
    }
  })
});

router.get('/comment', function(req, res, next) {
  console.log("In the GET route?");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(commentList); //Otherwise console log the comments you found
      res.json(commentList);
    }
  })
});


module.exports = router;
