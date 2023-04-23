"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime
import requests
#constants
data_length=20
url_brain_sensor="http://localhost:8080/api/brain_sensor/"

#read data froms sensor data. 
def brain_sensor_reader(data,userID):
    date=datetime.now()
    if len(data)==data_length:
        TP9=data[1]
        AF7=data[2]
        AF8=data[3]
        TP10=data[4]
        RightAUX= data[5]
        brain_sensor={"userID":userID,"TP9":TP9,"AF7":AF7,
                  "AF8":AF8,"TP10":TP10,"RightAUX":RightAUX,"date":date}
        r=requests.post(url_brain_sensor, brain_sensor)
        print("skin sensor:-",r.text)
    else:
        print("Data is not getting correctly,Waiting.")