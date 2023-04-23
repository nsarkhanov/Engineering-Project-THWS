"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime
from src.utilities.constants import brain_sensor_length

#read data froms sensor data. 
def brain_sensor_reader(data,userID):
    date=datetime.now()
    if len(data)==brain_sensor_length:
        TP9=data[1]
        AF7=data[2]
        AF8=data[3]
        TP10=data[4]
        RightAUX= data[5]
        brain_sensor={"userID":userID,"TP9":TP9,"AF7":AF7,
                  "AF8":AF8,"TP10":TP10,"RightAUX":RightAUX,"date":date}
        return brain_sensor
    else:
        print("Data is not getting correctly yet.")
