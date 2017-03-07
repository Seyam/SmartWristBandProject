/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */


var m = require('mraa');
const mqtt = require('mqtt');
var Ms = require('microseconds');
//var request = require('request');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var PythonShell = require('python-shell');
// var pyshell = new PythonShell('blink.py');


// var options = {
//   mode: 'text',
//   // pythonPath: 'path/to/python',
//   // pythonOptions: ['-u'],
//   // scriptPath: 'path/to/my/scripts',
//   // args: ['value1', 'value2', 'value3']
// };



//var sys = require('util');
//var net = require('net');


console.log('MRAA Version: ' + m.getVersion());


const broker = mqtt.connect('mqtt://iot.eclipse.org');

broker.on('connect', function () {
    //broker.subscribe('light');
    //broker.publish('light-status', state);
    console.log('I get executed Once and I\'m Connected To The Broker');
});


var ledState = true; //Boolean to hold the state of Led
var i=0;


//SONAR data extraction code
var echoPin = new m.Gpio(12);
var trigPin = new m.Gpio(11);
var LEDPin = new m.Gpio(3);



var loopDelay = 2000; // ms
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
    console.log(distance+' cm');

      var currentTime = moment().tz("Asia/Dhaka").format('YYYY/MM/DD HH:mm:ss');
      
      var sensorData = {"sdata": distance, "did":"0001", "dtime":currentTime, "status":"Alerted"};//This JSON Object can be directly inserted into MongoDB

      var serializedData = JSON.stringify(sensorData); //Stringifying required before publishing to MQTT broker

      // broker.publish('sonar', distance.toString());
      broker.publish('sonar', serializedData);
      //console.log('published!');


      if(distance <= 10){

        broker.publish('feedback', '1');

        blink4();

        // sensorData["status"]="Alerted";
        // var serializedData = JSON.stringify(sensorData); //Stringifying required before publishing to MQTT broker
        // broker.publish('fbData', sensorData);
        
      }



      else if(distance>10 && distance<=20){

        broker.publish('feedback', '1');

        blink3();

      }



      else if(distance>20 && distance<=30){

        broker.publish('feedback', '1');
        blink2();

      }



      else if(distance>30 && distance<=40){

        broker.publish('feedback', '1');

        blink1();

      }


      else{
        LEDPin.write(0);
        //broker.publish('feedback', '0');
      }

}, loopDelay);


function blink1()
{
  LEDPin.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  // console.log('Done');
  ledState = !ledState; //invert the ledState

  var myTime=setTimeout(blink1,150); //call the indicated function after 1 second (1000 milliseconds)
  i=i+1;

  if(i==2){

    clearTimeout(myTime);
    i=0;

  }
  
}




function blink2()
{
  LEDPin.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  // console.log('Done');
  ledState = !ledState; //invert the ledState

  var myTime=setTimeout(blink2,150); //call the indicated function after 1 second (1000 milliseconds)
  i=i+1;

  if(i==4){

    clearTimeout(myTime);
    i=0;

  }
  
}


function blink3()
{
  LEDPin.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  // console.log('Done');
  ledState = !ledState; //invert the ledState

  var myTime=setTimeout(blink3,150); //call the indicated function after 1 second (1000 milliseconds)
  i=i+1;

  if(i==6){

    clearTimeout(myTime);
    i=0;

  }
  
}


function blink4()
{
  LEDPin.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  // console.log('Done');
  ledState = !ledState; //invert the ledState

  var myTime=setTimeout(blink4,150); //call the indicated function after 1 second (1000 milliseconds)
  i=i+1;

  if(i==8){

    clearTimeout(myTime);
    i=0;

  }
  
}

// blink4(); //call the periodicActivity function



//app.listen(8081); //192.168.4.221:8081
//console.log("Server Running!");