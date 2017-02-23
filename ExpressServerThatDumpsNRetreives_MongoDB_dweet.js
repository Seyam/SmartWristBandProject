/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var m = require('mraa');
var Ms = require('microseconds');
var request = require('request');
var moment = require('moment');
var momentTimezone = require('moment-timezone');

var sys = require('util');
var net = require('net');


console.log('MRAA Version: ' + m.getVersion());

//var soundSensor = new m.Aio(0);

//var threshold = 500; 

mongoose.connect('mongodb://192.168.0.103/myDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( "we're connected!");
});



var mySchema = mongoose.Schema({
    sdata: String,
    did  : String,
    dtime: String

});

var SensorData = mongoose.model('SensorData', mySchema); //use this model to retrieve data from mongoDB

// Create an instance of this above model
var my_instance = new SensorData({ sdata: 'sonar', did:'11cm', dtime:'9/2/5'}); //Must match the fields or properties of the defined Schema

// Save the new model instance, passing a callback
// my_instance.save(function (err) {
//   if (err) return handleError(err);
//     console.log('Model Saved');// saved!
// });


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//SONAR data extraction code
var echoPin = new m.Gpio(12);
var trigPin = new m.Gpio(11);
var LEDPin = new m.Gpio(13);


var loopDelay = 60; // ms
var threshold = 5; //cm
var LOW = 0;
var HIGH = 1;

trigPin.dir(m.DIR_OUT);
echoPin.dir(m.DIR_IN);

LEDPin.dir(m.DIR_OUT);

//setInterval(LEDBlink(1),2000);
//LEDBlink(1);

// sleep microseconds
function usleep(us) {
    start = Ms.now();
    while (true) {
        if (Ms.since(start) > us) {
            return;
        }
    }
}


function LEDBlink(c) {
    for (var i = 0; i < c; i++) {
        LEDPin.write(HIGH);
        usleep(1000000); // 50000=50ms
        LEDPin.write(LOW);
    }
}


setInterval(function(){
    var pulseOn, pulseOff;
    var duration, distance;
    trigPin.write(HIGH); 
    usleep(2);
    trigPin.write(HIGH);
    usleep(10); 
    trigPin.write(LOW);
    while (echoPin.read() == 0) {
        pulseOff = Ms.now();
    }
    while (echoPin.read() == 1) {
        pulseOn = Ms.now();
    }
    duration = pulseOn - pulseOff;
    distance = parseInt(duration / 58.2);

    //console.log('I am running...');
    //console.log(distance+' cm');

    if(distance <= threshold){

      var currentTime = moment().tz("Asia/Dhaka").format('YYYY/MM/DD HH:mm:ss');
      var sensorData = {"sdata": distance, "did":"0001", "dtime":currentTime};


      request(
      {
        method: 'POST',
        //url: 'http://192.168.10.107:80/sounddata',
        url: 'https://dweet.io/dweet/for/seyam-thing',
        json: false,
        headers: {
            "content-type": "application/json",            
        },
        body: JSON.stringify(data)

      }, function(error, response, body){
      
			  //console.log(response);
		     
		      if(response.statusCode === 200){
		        console.log('posted successfully with a sound value of ' + distance ); 
		      }

		      else{
		        console.log('oops, there was an error');
		        console.log(response.statusCode + ' :::: ' + response.body);
		      }
    	});


              

              db.collection('sensordatas').insert(sensorData, function (err, result) {
                    if (err)
                       console.log('Error');
                    else
                       console.log('Success');
              });

    }

}, loopDelay);


app.get('/api/all', function (req, res) {
   fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
       var read_data=JSON.parse(data);       
       res.json(read_data);
       //res.end( data );
       console.log(read_data);

   });
});


app.get('/api/:name', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
       sensordata = JSON.parse( data );
       var dataRequested = sensordata[req.params.name]
       console.log( dataRequested );
       res.json(dataRequested);
       //res.end( JSON.stringify(dataRequested));
   });
})



app.get('/data', function (req, res) {
   	   //var dataRetrieved = db.getCollection('SensorData').find({});
       SensorData.find({/*json object key */}, function (err, docs) {
          //var dt = JSON.parse(docs);
          console.log(docs);
          res.json(docs); //perfect!!!
          //res.end( JSON.stringify(docs));
          //res.end(docs);
            // docs.forEach 
      });
       
})



app.get('/1', function (req, res) {
   
      var val = db.SensorData.find().pretty();
      console.log(val);

      res.json(val);
      //res.end( data );
})



app.delete('/api/:name', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "sensor_database.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[req.params.name];
       
       console.log( data );
       res.json(data);
       //res.end( JSON.stringify(data));
   });
})


app.put('/api/:name', function (req, res, next) {
  //console.log(req.body);
  
  fs.readFile(__dirname+'/sensor_database.json','utf8',function(err,data){
    data=JSON.parse(data);

    data[req.params.name]=req.body;
    
    //data[req.params.name]=bodydata;

    console.log(data);
    res.json(data);
    //var dataSerialized = JSON.stringify(data);
    //res.json(dataSerialized);
    //fs.writeFile('/sensor_database.json',dataSerialized);
  });

})



app.post('/', function(req, res) {
   // Insert JSON straight into MongoDB
 
})



//var server = app.listen(8081, function () {

  //var host = server.address().address
  //var port = server.address().port

  //console.log("Example app listening at http://%s:%s", host, port)

//})


app.listen(8081,'192.168.4.221'); //192.168.4.221:8081
console.log("Server Running!")