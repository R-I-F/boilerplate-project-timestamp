// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get("/api/", function(req, res){
//   const dateObject = new Date()
//   const unixTime = dateObject.getTime();


//   res.json({
//     unix: unixTime,
//     utc: dateObject.toUTCString()
//   })

// })

app.get("/api/:date?", function(req, res){

  const inputParam = req.params.date;
  let dateObject;

  if(!inputParam){
    dateObject = new Date();
  }
  else if (isNumeric(inputParam)){ 
    // else if it is a unix timestamp
    dateObject = new Date(parseInt(inputParam))
  }
  else {
    // if the req.params.date is in the format of a string
    dateObject = new Date(inputParam);    
  }

  if(isNaN(dateObject)){
    return res.json({ error: "Invalid Date" })
  }
  else{
      const unixTime = dateObject.getTime();
      return res.json({
          unix: unixTime,
          utc: dateObject.toUTCString()
        });
    }

})

function isNumeric(str) {
  // Use regular expression to match only numeric characters
  return /^\d+$/.test(str);
}


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
