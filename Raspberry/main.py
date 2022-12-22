from servo_com import ServoMotor
import requests
import json
from time import sleep
from fetch import fetch_spin

def home_servos(servos):
	for servo in servos:
		servo.home()

servos = [
	ServoMotor(18,6),
	ServoMotor(-1,6),
	ServoMotor(-1,6),
	ServoMotor(-1,6),
]

home_servos(servos)

while True:
	spin = fetch_spin()
	if spin != -1:
		if spin < len(servos) and spin >= 0:
			success = servos[spin].next_slot()
			print(success)