from servo_com import ServoMotor
import requests
import json
from time import sleep

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
	try:
		res = requests.get("http://192.168.1.35:3000/api/raspberry/get",timeout=5)
	except:
		print("Not working")
		sleep(5)
		continue
	response = json.loads(res.text)
	if response["spin"] == -1:
		sleep(1)
		continue
	servos[0].next_slot()
	