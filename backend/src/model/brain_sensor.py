"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime

#read data froms sensor data. 
def brain_sensor_reader(data,userID):
    if len(data)>0:
        TP9=data[0][0]
        AF7=data[0][1]
        AF8=data[0][2]
        TP10=data[0][3]
        RightAUX= data[0][4]
        brain_sensor={"userID":userID,"TP9":TP9,"AF7":AF7,
                  "AF8":AF8,"TP10":TP10,"RightAUX":RightAUX,"date":datetime.fromtimestamp(data[1])}
        return brain_sensor
    else:
        print("Data is not getting correctly yet.")
