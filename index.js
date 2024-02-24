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

app.get("/api/:date", function(req, res){

  const inputParam = req.params.date
  let dateObject;
  if (inputParam.includes("-")){
      dateObject = new Date(inputParam)
  }
  else{
      dateObject = new Date(parseInt(inputParam))
  }
  dateObject.setHours(0);
  dateObject.setMinutes(0);
  dateObject.setSeconds(0);
  
  // Array of weekday names
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Array of month names
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  
  const date = dateObject.getDate();
  const dayNum = dateObject.getDay();
  const dayName = days[dayNum];
  const unixTime = dateObject.getTime();
  const monthNum = dateObject.getMonth();
  const monthName = months[monthNum];
  const year = dateObject.getFullYear();
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const seconds = String(dateObject.getSeconds()).padStart(2, '0');
  
  res.json({
      unix: unixTime,
      utc: `${dayName}, ${date} ${monthName} ${year} ${hours}:${minutes}:${seconds} GMT`
    })

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});