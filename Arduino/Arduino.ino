#include <Servo.h>

Servo servo;

int angle = 10;

void setup()
{
	Serial.begin(9600);
	servo.attach(3);
	servo.write(180);
}

void loop()
{

	String temp = readSerialPort();
	if(temp != "")
	{
		sendData(temp);
	}
}

String readSerialPort()
{
	if (Serial.available() > 0) {
		String data = Serial.readStringUntil('\n');
		return data;
  	}

	return "";
}

void sendData(String what)
{
	Serial.print("From arduino");
	Serial.print("Resived: ");
	Serial.println(what);
}