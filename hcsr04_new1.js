var m = require('mraa');
var μs = require('microseconds');

var echoPin = new m.Gpio(12);
var trigPin = new m.Gpio(11);
var LEDPin = new m.Gpio(13);

//var defaultDistance = 0; // centimètre 
//var prevDistance = 0;
//var counter = 0;
//var adjustment = 3; // centimètre
// var lock = false;
// var maximumRange = 400; // Maximum range needed
// var minimumRange = 3; // Minimum range needed
//var unlockReadyCounter = 0;
//var unlockReadyCounterAdjusment = 0;
var loopDelay = 60; // ms
var LOW = 0;
var HIGH = 1;

trigPin.dir(m.DIR_OUT);
echoPin.dir(m.DIR_IN);

LEDPin.dir(m.DIR_OUT);
LEDBlink(3);

// sleep microseconds
function usleep(us) {
    start = μs.now();
    while (true) {
        if (μs.since(start) > us) {
            return;
        }
    }
}

// function lockCounter() {
//     LEDPin.write(LOW);
//     unlockReadyCounter = 0;
//     lock = true;
// }

// function unlockCounter() {
//     if (unlockReadyCounter > unlockReadyCounterAdjusment) {
//         LEDPin.write(HIGH);
//         unlockReadyCounter = 0;
//         lock = false;
//     } else {
//         unlockReadyCounter++;
//     }
// }

function LEDBlink(c) {
    for (var i = 0; i < c; i++) {
        LEDPin.write(HIGH);
        usleep(50000); // 50ms
        LEDPin.write(LOW);
    }
}

// function init() {
//     lock = true;
//     defaultDistance = 0;
//     prevDistance = 0;
//     unlockReadyCounter = 0;
//     //counter = 0;
// }

setInterval(function(){
    var pulseOn, pulseOff;
    var duration, distance;
    trigPin.write(HIGH); 
    usleep(2);
    trigPin.write(HIGH);
    usleep(10); 
    trigPin.write(LOW);
    while (echoPin.read() == 0) {
        pulseOff = μs.now();
    }
    while (echoPin.read() == 1) {
        pulseOn = μs.now();
    }
    duration = pulseOn - pulseOff;
    distance = parseInt(duration / 58.2);

    console.log(distance);

    // if (
    //     !distance ||
    //     (!defaultDistance && prevDistance > 0)
    //    ) {
    //     init();
    //     defaultDistance = distance;
    //     console.log("defaultDistance: " + defaultDistance + "cm.");
    //     LEDBlink(2);
    // } else if ( 
    //         distance >= maximumRange ||
    //         distance <= minimumRange ||
    //         defaultDistance <= distance ||
    //         defaultDistance > prevDistance
    //         ) { // lock condtion
    //     lockCounter();
    // } else if (
    //         (defaultDistance - adjustment) > distance
    //         ) { // unlock condtion
    //     unlockCounter();
    //     console.log("unlockReadyCounter: " + unlockReadyCounter + " count.");
    //     console.log(" -> Distance: " + distance + "cm.");
    // }
    // if (lock == false) {
    //     LEDBlink(1);
    //     lockCounter();
    //     counter++;
    //     console.log("Counter: " + counter + ".");
    //     console.log(" -> Distance: " + distance + "cm.");
    // }
    // if (distance && unlockReadyCounter == 0) {
    //     prevDistance = distance;
    // }
}, loopDelay);
