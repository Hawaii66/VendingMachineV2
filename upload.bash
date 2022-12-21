echo "Start"

arduino-cli compile -b arduino:avr:uno /home/pi/Desktop/VendingMachineV2/Arduino/Arduino

echo "Done compiling, sending to arduino"

arduino-cli upload -p /dev/ttyACM0 --fqbn arduino:avr:uno Arduino

echo "Done uploading"