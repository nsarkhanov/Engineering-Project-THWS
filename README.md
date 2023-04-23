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
3. Start the MongoDB service.
4. Run the `main.py` script to start collecting sensor data and storing it in the database.
5. Open the `visualize.py` script to see a visual representation of the collected data.


## Usage

Once you have followed the steps in the "Getting Started" section, you can use this project to collect real-time sensor data and visualize it.

### Collecting Sensor Data

To collect sensor data, simply run the `main.py` script. This will start collecting data from the connected sensors and storing it in the MongoDB database.

### Visualizing Sensor Data

To visualize the collected sensor data, run the `visualize.py` script. This will open a web page with a graph that shows the real-time data from the sensors.
## Technologies

List the technologies used in your project, such as:

- Python
- MongoDB
- Dash/React

## Contributing

Explain how others can contribute to your project, such as:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your forked repository.
5. Submit a pull request.
## License

This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for more details.
