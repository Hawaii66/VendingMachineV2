from gpiozero import AngularServo
from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep

pin_factory = PiGPIOFactory()

MIN_ANGLE = -90
MAX_ANGLE = 90

class EmptyServo:
	def __init__(self):
		self.angle = 0


class ServoMotor:
	def __init__(self, pin,slots):
		if pin == -1:
			self.servo = EmptyServo()
			return

		servo = AngularServo(pin,min_angle=MIN_ANGLE,max_angle=MAX_ANGLE,min_pulse_width=0.0005,max_pulse_width=0.0025,pin_factory=pin_factory)
		self.servo = servo
		self.slots = slots
		self.index = 0
	
	def set_angle(self,angle):
		self.servo.angle = angle
		sleep(0.5)

	def home(self):
		self.set_angle(MIN_ANGLE)

	def next_slot(self):
		self.index += 1
		if self.index > self.slots:
			self.index = self.slots
			return False

		old_range = self.slots - 0
		new_range = MAX_ANGLE - MIN_ANGLE
		new_value = (((self.index - 0) * new_range) / old_range) + MIN_ANGLE

		self.set_angle(new_value)
		return True