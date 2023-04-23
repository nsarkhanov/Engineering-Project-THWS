# Real-Time Sensor Data Collection and Visualization

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This project involves collecting real-time data from pulse, heart pulse, gyroscope, and skin sensors and storing it in a MongoDB database to create a visual representation of the data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

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



## Contributing

Explain how others can contribute to your project, such as:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your forked repository.
5. Submit a pull request.
## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more details.
