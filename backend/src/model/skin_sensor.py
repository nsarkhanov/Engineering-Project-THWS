"""
Project: Data-Logger
Location: Schweinfurt, Germany
Author: Nurlan Sarkhanov
Date: April 22, 2023
"""
from datetime import datetime
from src.utilities.constants import left_hand_data_length

def skin_rate_reader(data, userID):
    date = datetime.now()
    if len(data) == left_hand_data_length:
        skin_rate = data[19] # extract heart rate value and convert to integer
        skin_pack = {"userID": userID, "rate": skin_rate, "date": date}
        return skin_pack
    else:
        print("Data is not getting correctly yet.")






