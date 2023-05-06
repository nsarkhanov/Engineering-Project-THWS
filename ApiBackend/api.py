
from fastapi import FastAPI
from model.models import *
from utilities.utility import *
from utilities.constants import *
import threading

global stop_event
stop_event=threading.Event()
ser=serial_connection(port_name=port_name,baudrate=9600)

def start_sender():
    userID=1
    #start borad connection and process
    command="s"
    ser.write(command.encode())
    while not stop_event.is_set():
        # receive data from serial port and log it
        sensor_data = ser.readline().decode()
        sender(data=sensor_data, userID=userID)

#start threading in button 
def start_thread():
    data_sender_thread = threading.Thread(target=start_sender,)
    data_sender_thread.start() 

def stop_data_sender_thread():
        # set the event to signal the thread to stop
    stop_event.set()


app = FastAPI()
@app.get("/start")
async def start():

    #read dat from serial connectin and send to mongo db  
    start_thread()
    return 

@app.get("/stop")
async def stop():
    command="q"
    command_sender(ser=ser,cmd=command)
    stop_data_sender_thread()
    return 

@app.get("/stream")
async def stream():
    return stream_data(data= ser.readline().decode(),userID="1")
