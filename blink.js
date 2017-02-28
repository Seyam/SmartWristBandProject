var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion());

var led = new m.Gpio(3); 
led.dir(m.DIR_OUT);
//var ledState = true; 


var blinkState = 0; 

function blink(){
  led.write(blinkState);
  blinkState = blinkState?0:1;   // toggle state
  //setInterval(blink,100); won't work

}

setInterval(blink,100);

