"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
# Define endpoint APIs
url_heart_rate = "http://localhost:8080/api/heart_rate/" 
url_imu_sensor = "http://localhost:8080/api/imu_sensor/"
url_brain_sensor="http://localhost:8080/api/brain_sensor/"
url_skin_sensor="http://localhost:8080/api/skin_sensor/"

# chunk size mb  of batch file
chunk_size=0.1

# constant for sensor 
left_hand_data_length=21
other_data_length=18
brain_sensor_length=19
#serial connection 
port_name="/dev/ttyACM0"
baudrate=9600