/**
 * HC-SR04 Demo
 * Demonstration of the HC-SR04 Ultrasonic Sensor
 * Date: August 3, 2016
 * 
 * Description:
 *  Connect the ultrasonic sensor to the Arduino as per the
 *  hardware connections below. Run the sketch and open a serial
 *  monitor. The distance read from the sensor will be displayed
 *  in centimeters and inches.
 * 
 * Hardware Connections:
 *  Arduino | HC-SR04 
 *  -------------------
 *    5V    |   VCC     
 *    7     |   Trig     
 *    8     |   Echo     
 *    GND   |   GND
 *  
 * License:
 *  Public Domain
 */

// Pins
#define TRIG_PIN  12
#define ECHO_PIN  11

// Anything over 400 cm (23200 us pulse) is "out of range"
const unsigned int MAX_DIST = 23200;

#define LED 13

void setup() {

  // The Trigger pin will tell the sensor to range find
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(LED, OUTPUT);
  digitalWrite(TRIG_PIN, LOW);

  // We'll use the serial monitor to view the sensor output
  Serial.begin(9600);
}

void loop() {

  unsigned long t1;
  unsigned long t2;
  unsigned long pulse_width;
  float cm;
  float inches;

  // Hold the trigger pin high for at least 10 us
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Wait for pulse on echo pin
  while ( digitalRead(ECHO_PIN) == 0 );

  // Measure how long the echo pin was held high (pulse width)
  // Note: the micros() counter will overflow after ~70 min
  t1 = micros();
  while ( digitalRead(ECHO_PIN) == 1);
  t2 = micros();
  pulse_width = t2 - t1;

  // Calculate distance in centimeters and inches. The constants
  // are found in the datasheet, and calculated from the assumed speed 
  //of sound in air at sea level (~340 m/s).
  cm = pulse_width / 58.2;
  //inches = pulse_width / 148.0;

  // Print out results
  if ( pulse_width > MAX_DIST ) {
    Serial.println("Out of range");
  } else {
    Serial.print(cm);
    Serial.println(" cm \t");
//    Serial.print(inches);
//    Serial.println(" in");
  }


      if((100 > cm) && (cm >= 0)){
        
          vibrate4Times();
          
      }
    
      else if((200 >  cm) && (cm > 100)){
    
          vibrate3Times();
        
      }
    
      else if((300 >  cm) && (cm > 200)){
    
          vibrate2Times();
        
      }
    
      else if((400 >  cm) && (cm > 300)){
    
          vibrate1Time();
        
      }

  
  // Wait at least 60ms before next measurement
  delay(60);
}


void vibrate4Times(){
    Serial.println("vibrate 4 Times");
    
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
  
}


void vibrate3Times(){

    Serial.println("vibrate 3 Times");
  
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
  
}


void vibrate2Times(){

    Serial.println("vibrate 2 Times");
    
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
  
}

void vibrate1Time(){

    Serial.println("vibrate 1 Time");
  
    digitalWrite(LED,HIGH);
    delay(150);
    digitalWrite(LED,LOW);
    delay(150);
  
}
