import serial

def strip_end(text):
	text = text.replace("\r","")
	text = text.replace("\n","")
	return text

class SerialCom:
	def __init__(self):
		self.port = "/dev/ttyACM0"
		self.baud = 9600
		self.connected = False
		self.ser = -1

	def connect(self):
		if self.connected == True:
			return
		
		self.ser = serial.Serial(self.port,self.baud,timeout=5)
		self.ser.reset_input_buffer()

	def close(self):
		if self.connected == False:
			return

		self.ser.close()
		self.connected = False
	
	def send_text(self,text):
		print("Sending to arduino: " + text)
		self.ser.reset_input_buffer()
		self.ser.write(text.encode()+  "\n")

	def get_text(self):
		self.ser.reset_input_buffer()
		line = strip_end(self.ser.readline().decode("utf-8"))
		print("From arduino reading: " + line)
		return line