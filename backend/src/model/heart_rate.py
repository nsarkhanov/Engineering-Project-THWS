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
        heart_rate = int(data[19][:3])  # extract heart rate value and convert to integer
        heart_pack = {"userID": userID, "rate": heart_rate, "date": date}
        return heart_pack
    else:
        print("Data is not getting correctly yet.")

    #     if mode == "send":
    #         # send heart rate data as dictionary using requests library
    #         r = requests.post(url_heart_rate, heart_pack)
    #         if r.status_code == 200:  # check if the request was successful
    #             print(f"Heart rate sent successfully:{heart_pack}")
    #         else:
    #             print(f"Error sending heart rate: {r.status_code}")
    #     elif mode == "save":
    #         return heart_pack
    #     else:
    #         print("Invalid mode. Mode must be 'send' or 'save'.")
    # else:
    #     print("Data is not getting correctly, waiting.")








# def heart_rate_reader(data,userID):
#     date=datetime.now()
#     if len(data)==data_length:
#         heart_rate=data[19][:3]
#         heart_pack={"userID":userID,"rate":heart_rate,"date":date}     
#     else:
#         print("Data is not getting correctly,Waiting.")

#     def sensor_method(mode="send"):
#         if mode =="send":
#             print("send mode") 
#             # r=requests.post(url_imu_sensor, imu_pack)
#             # print("imu sensor:-",r.text)  
#         elif mode=="save":
#               print("save mode") 

