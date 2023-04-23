"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime
from src.utilities.constants import left_hand_data_length

def heart_rate_reader(data, userID):
    date = datetime.now()
    if len(data) == left_hand_data_length:
        heart_rate = int(data[19]) 
        heart_pack = {"userID": userID, "rate": heart_rate, "date": date}
        return heart_pack
    else:
        print("Data is not getting correctly yet.")

