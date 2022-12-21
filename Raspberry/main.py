from servo_com import ServoMotor

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
	print("Moving to next slot")
	success = servos[0].next_slot()
	if not success:
		break