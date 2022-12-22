import os
import requests
from dotenv import load_dotenv
from time import sleep

load_dotenv()
def fetch_spin():
	MACHINE_ID = os.getenv("MACHINE_ID")
	RASPBERRY_ID = os.getenv("RASPBERRY_ID")
	try:
		res = requests.get("http://192.168.1.35:3000/api/raspberry/get?id="+RASPBERRY_ID+"&machine="+MACHINE_ID,timeout=5)
		if res.status_code == 200:
			json_data = res.json()
			spin = json_data["spin"]
			return spin
		sleep(5)
	except:
		print("Error with fetching, trying again in 10 seconds")
		sleep(10)

	return -1
