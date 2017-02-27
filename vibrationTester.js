var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion());

var myLed = new m.Pwm(6); 
//myLed.dir(m.DIR_OUT);
//var ledState = true; 

var value=1;

periodicActivity(); 

function periodicActivity()
{
  myLed.write(value); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  value = value-0.1;
  if (value < 0) clearTimeout();
  setTimeout(periodicActivity,100); //call the indicated function after 1 second (1000 milliseconds)
}

