"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime
from src.utilities.constants import other_data_length

def imu_sensor_reader(data,userID):
    sensorID=data[0]
    date=datetime.now()
    if len(data) >= other_data_length:
        acceleration= [data[1],data[7],data[13]]
        orientation = [data[2],data[8],data[14]]
        gyro=         [data[3],data[9],data[15]]
        magnetic=     [data[4],data[10],data[16]]
        linear=       [data[5],data[11],data[17]]
        gravity=      [data[6],data[12],data[18]]
        imu_pack={"userID":userID,"sensorID":sensorID,"acceleration":acceleration,
                "orientation":orientation,"gyro":gyro,"magnetic":magnetic,
                "linear":linear,"gravity":gravity,"date":date}
        return imu_pack
    else:
        print("Data is not getting correctly yet.")



