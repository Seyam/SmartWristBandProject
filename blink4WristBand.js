var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the console

var myLed = new m.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
myLed.dir(m.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led
var i=0;



function blink1()
{
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  console.log('Done');
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
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  console.log('Done');
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
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  console.log('Done');
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
  myLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
  console.log('Done');
  ledState = !ledState; //invert the ledState

  var myTime=setTimeout(blink4,150); //call the indicated function after 1 second (1000 milliseconds)
  i=i+1;

  if(i==8){

  	clearTimeout(myTime);
  	i=0;

  }
  
}

blink4(); //call the periodicActivity function


