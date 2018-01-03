// ---------------------------------------------------------------------------
// Example NewPing library sketch that does a ping about 20 times per second.
// ---------------------------------------------------------------------------

#include <NewPing.h>

#define TRIGGER_PIN  12  // Arduino pin tied to trigger pin on the ultrasonic sensor.
#define ECHO_PIN     11  // Arduino pin tied to echo pin on the ultrasonic sensor.
#define MAX_DISTANCE 200 // Maximum distance we want to ping for (in centimeters). Maximum sensor distance is rated at 400-500cm.

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.

void setup() {
  Serial.begin(115200); // Open serial monitor at 115200 baud to see ping results.
}

void loop() {
      delay(50);                     // Wait 50ms between pings (about 20 pings/sec). 29ms should be the shortest delay between pings.
      Serial.print("Ping: ");
      Serial.print(sonar.ping_cm()); // Send ping, get distance in cm and print result (0 = outside set distance range)
      Serial.println("cm");
    
//      if((50 >  sonar.ping_cm()) && (sonar.ping_cm() >= 1)){
//        
//          Serial.println("Blink 5");
//      }
//    
//      else if((100 >  sonar.ping_cm()) && (sonar.ping_cm() > 50)){
//    
//          Serial.println("Blink 4");
//        
//      }
//    
//      else if((150 >  sonar.ping_cm()) && (sonar.ping_cm() > 100)){
//    
//          Serial.println("Blink 3");
//        
//      }
//    
//      else if((200 >  sonar.ping_cm()) && (sonar.ping_cm() > 150)){
//    
//          Serial.println("Blink 2");
//        
//      }
//    
//      else if((sonar.ping_cm() > 200)){
//    
//          Serial.println("Blink 1");
//        
//      }

//      else{
//        Serial.println("No Blink");
//      }


  
}
