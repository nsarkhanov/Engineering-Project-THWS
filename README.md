# Real-Time Sensor Data Collection and Visualization

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This project involves collecting real-time data from pulse, heart pulse, gyroscope, and skin sensors and storing it in a MongoDB database to create a visual representation of the data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
## Project Architecture
The project consists of one "mother" board and four "children" ESP8266 boards. The children boards collect sensor data and send it to the mother board, which in turn sends the data to the application for storage in a MongoDB database.

In addition to the children boards, the project includes a heart rate sensor and a skin resistance sensor on the left hand of the user, as well as an inertial measurement unit (IMU) on each child board. The project also includes a Muse brain sensor to collect data from the user's brain.

Here is a more detailed breakdown of the project architecture:
![Project Architecture](other/assets/architecture.png)

## Children Boards
Each child board collects sensor data and sends it to the mother board. The child boards are based on the ESP8266 microcontroller and are responsible for collecting data from the following sensors:

Inertial measurement unit (IMU)
Other custom sensors (specific to your use case)
## Mother Board
The mother board receives data from the children boards and sends it to the application. The mother board is also based on the ESP8266 microcontroller and is responsible for the following:

- Receiving data from the children boards
- Sending data to the application
- Managing communication between the children boards and the application

## Heart Rate Sensor and Skin Resistance Sensor
The heart rate sensor and skin resistance sensor are located on the left hand of the user. These sensors are connected to the mother board and provide additional data points for the application to use.

## Muse Brain Sensor
The Muse brain sensor collects data from the user's brain and sends it to the application. This sensor is not connected to any of the microcontrollers in the project, but instead communicates directly with the application.

Use this architecture diagram to better understand how the different components of the project work together to collect and store sensor data.



## Installation

1. Clone the repository:
2. Run the script : "setup.sh" <  *Create Env and install required libraries automatically* >

## Getting Started

To use this project, you will need to have the following installed:

- Python 3.x
- MongoDB
- The necessary Python libraries listed in requirements.txt

Once you have installed these dependencies, you can follow these steps to get started with the project:

1. Clone the repository to your local machine.
3. Start the MongoDB service (mongodb/server.js) and run `node server.js`
4. Run the `main.py` script (in backend folder) to start collecting sensor data and storing it in the database.


## Usage

Once you have followed the steps in the "Getting Started" section, you can use this project to collect real-time sensor data and visualize it.
## Data Collector App
The main.py file in the project's backend directory contains the data collector application. This application collects data from sensors and sends it to a MongoDB database. The main.py file supports two modes of operation:
## Real-time Mode
In real-time mode, the application continuously reads sensor data and sends it to the MongoDB database in real-time. To run the application in real-time mode, simply run the main.py add user id and select real-time box:
## Batch Mode
In batch mode, the application reads sensor data and saves it to a JSON file. When the JSON file reaches a certain size, the application stops reading sensor data and attempts to send the file to the MongoDB database. To run the application in batch mode, simply run the main.py add user id and select batch box:
## Config
To configure the project, you should edit the `constant.py` file located in the _src/utilities_ folder. In this file, you can set the *connections port*, *bautrate*, and *chunck_size* for batch file contact.
## Extra
If you want to use MongoDB in a container, you can run the docker-compose file located in the other/docker folder. This will start a MongoDB container. Once the container is running, you can configure the config.js file located in the mongodb/config folder. This file is used to set up the initial configuration of the MongoDB instance.
### Arduino Code
To ensure that the correct data structure is being sent from the ESPs to the application, you should flash the Arduino code located in the *other/arduino* folder to your ESPs. This code will format the data correctly and send it to the application.

Here are the steps to flash the Arduino code:

Open the Arduino IDE and connect your ESP to your computer.
Open the application.ino file located in the arduino folder.
In the Arduino IDE, go to Tools > Board and select your ESP board.
In the Arduino IDE, go to Tools > Port and select the port to which your ESP is connected.
Upload the code to your ESP by clicking on the Upload button in the Arduino IDE.
Once the code is uploaded to your ESP, it will start sending data to the application in the correct data structur

## API Testing
To test the API endpoints, you can use the following test data. Simply replace the endpoint and data with the appropriate values for your use case

### Collecting Sensor Data

To collect sensor data, simply run the `main.py` script. This will start collecting data from the connected sensors and storing it in the MongoDB database.

## Technologies

List the technologies used in your project, such as:

- Python
- MongoDB

## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more details.
