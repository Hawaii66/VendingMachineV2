import os
import requests
from dotenv import load_dotenv
from time import sleep

load_dotenv()
def fetch_spin():
	MACHINE_ID = os.getenv("MACHINE_ID")
	RASPBERRY_ID = os.getenv("RASPBERRY_ID")
	API_ROUTE = os.getenv("API_FETCH_URL")
	try:
		res = requests.get(API_ROUTE+"?id="+RASPBERRY_ID+"&machine="+MACHINE_ID,timeout=5)
		if res.status_code == 200:
			json_data = res.json()
			spin = json_data["spin"]
			return spin
		sleep(5)
	except:
		print("Error with fetching, trying again in 10 seconds")
		sleep(10)

	return -1
