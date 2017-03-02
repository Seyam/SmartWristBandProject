/* -----------------------------                                                
  AUTHOR:  @SEYAM
  seyam.bd.net@gmail.com
------------------------------ */

// var express = require('express');
// var app = express();
// var fs = require("fs");
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

//var sys = require('sys');
//var net = require('net');
var sys = require('util');
var mqtt = require('mqtt'); 
var io  = require('socket.io')();
var connections=[];


//var broker = new mqtt.MQTTbroker(1883, '127.0.0.1', 'pusher');
const broker = mqtt.connect('mqtt://iot.eclipse.org')
broker.subscribe('sonar');
console.log('subscribed to topic sonar');
broker.subscribe('feedback');
console.log('subscribed to topic \'feedback\'');


//mongoose.connect('mongodb://192.168.10.216/myDB');

//Multiple sockets requests handler 
io.sockets.on('connection', function (SocketIOclient) {

  connections.push(SocketIOclient);


  console.log('Connected: '+connections.length+' sockets connected!');


  SocketIOclient.on('publish', function (data) {
      broker.publish(data.topic,data.payload); //NOTICE BOTH TOPIC & PAYLOAD HAVE TO PUBLISH
      console.log('publishing to '+data.topic+' to turn it '+data.payload);
  });



  SocketIOclient.on('subscribe', function (data) {
        
        //socket.join(data.topic);
        broker.subscribe(data.topic);
        console.log('Subscribing to '+data.topic);
    });


  SocketIOclient.on('disconnect',function(){ //No Parameter For Disconnect Event
    console.log('one socket disconnected!');
  });

});



// // listen to messages coming from the mqtt broker[Not Required Here]
broker.on('message', function (topic, payload, packet) {
    console.log(topic+'='+payload);
    io.sockets.emit('mqttData', {'topic':String(topic),
                            'payload':String(payload)});
});

//For real time state update(addListener way :D :D )
// broker.addListener('mqttData', function(topic, payload){
//   sys.puts(topic+'='+payload);
//   io.sockets.emit('mqtt',{'topic':String(topic),
//                'payload':String(payload)});
// });

io.listen(5000);
console.log("SocketIO server is running at port 5000!");

 
/*broker.addListener('mqttData', function(topic, payload){
  sys.puts(topic+'='+payload);
  io.sockets.emit('mqtt',{'topic':String(topic),
    'payload':String(payload)});
});*/