/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */
var m = require('mraa');
var Ms = require('microseconds');
var mongoose = require('mongoose');
var moment = require('moment');
var momentTimezone = require('moment-timezone');

var sys = require('util');
var net = require('net');
//var mqtt = require('mqtt');

mongoose.connect('mongodb://192.168.10.216/myDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log( "Connected To Database!");
});

var mySchema = mongoose.Schema({
    SensorName	: String,
    SensorValue : String,
    Day         : String

});

var SensorType = mongoose.model('SensorType', mySchema);

var echoPin = new m.Gpio(12);
var trigPin = new m.Gpio(11);
var LEDPin = new m.Gpio(13);


var loopDelay = 60; // ms
var threshold = 10; //cm
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
    print(distance);

    if(distance <= threshold){

    	var currentTime = moment().tz("Asia/Dhaka").format('YYYY/MM/DD HH:mm:ss');
    	var sensorData = {"sdata": distance, "did":"0001", "dtime":currentTime};

              db.collection('SensorData').insert(sensorData, function (err, result) {
                    if (err)
                       console.log('Error');
                    else
                       console.log('Success');
              });

    }

}, loopDelay);


function print(distance){
	console.log(distance+' cm');
}

