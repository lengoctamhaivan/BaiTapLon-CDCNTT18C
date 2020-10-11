#include <Servo.h>

Servo servo;

#define SERVO 9
#define LED_OUT_DOOR 13
#define LED_IN_DOOR 12


byte c = '0';

void setup() {
  pinMode(SERVO, OUTPUT);
  pinMode(LED_IN_DOOR, OUTPUT);
  pinMode(LED_OUT_DOOR, OUTPUT);
  servo.attach(SERVO);
  digitalWrite(LED_IN_DOOR, LOW);
  digitalWrite(LED_OUT_DOOR, LOW);
  servo.write(60);
  Serial.begin(9600);
}

void loop() {
  delay(100);
  if(Serial.available()){
    c = Serial.read();
  }
  switch(c) {
    case '0':
      digitalWrite(LED_OUT_DOOR, LOW);
      Serial.println("LED_OUT_DOOR-OFF");
      digitalWrite(LED_IN_DOOR, LOW);
      Serial.println("LED_IN_DOOR-OFF");
      servo.write(60);
      Serial.println("DOOR-CLOSE");
      break;
    case '1':
      digitalWrite(LED_OUT_DOOR, HIGH);
      Serial.println("LED_OUT_DOOR-ON");
      break;
    case '2':
      digitalWrite(LED_OUT_DOOR, LOW);
      Serial.println("LED_OUT_DOOR-OFF");
      break;
    case '3':
      digitalWrite(LED_IN_DOOR, HIGH);
      Serial.println("LED_IN_DOOR-ON");
      break;
    case '4':
      digitalWrite(LED_IN_DOOR, LOW);
      Serial.println("LED_IN_DOOR-OFF");
      break;
    case '5':
      servo.write(180);
      Serial.println("DOOR-OPEN");
      break;
    case '6':
      servo.write(60);
      Serial.println("DOOR-CLOSE");
      break;
    default: break;
  }

}
