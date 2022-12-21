import serial

ser = serial.Serial("/dev/ttyACM0",9600,timeout=5)
def strip_end(text):
    text = text.replace("\r","")
    text = text.replace("\n","")
    return text
ser.reset_input_buffer()
print(ser.name)
text = raw_input("TEst")
if text != "":
	ser.write(text.encode())
ser.reset_input_buffer()
try:
	while True:
		line = strip_end(ser.readline().decode("utf-8"))
		print(line)
except KeyboardInterrupt:
	ser.close()
	print("Closed Serial port")

