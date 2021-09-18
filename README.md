# Arduino Workout Classification
Classifying workout exercises on an Arduino Nano 33 BLE Sense board.

Find a full presentation of the project under TBD.

## 1. Goal
- continuous classification of three exercise types: Jumping-Jacks, Push-Ups, Squats
- inference is running on an edge device
- total duration per exercise is accumulated and shown in some kind of visualization

## 2. Hardware Requirements

### 2.1 Arduino Nano BLE 33 (Sense)
- https://store-usa.arduino.cc/products/arduino-nano-33-ble-sense
- 9-axis inertial sensor. Here we make use of the 3-axis accelerometer
- Bluetooth Low Energy (BLE) used for sending the data for recording and the prediction results later in inference over to web dashboard
- support of TensorflowLite
- Sense board not required but offers way more sensors useful for other future projects, such as a humidity and temperature sensor or a microphone

### 2.2 (Optional) Silicon Sleeve
- https://store.arduino.cc/products/silicone-sleeve-arduino-nano-33-ble-sense
- protects the board
- improves handling and stability in pocket

### 2.3 USB A to Micro B cable
- e.g. https://www.amazon.de/gp/product/B0711PVX6Z
- for power and to write the code to the board

### 2.4 Powerbank
- allows for mobile usage of the Arduino board
- alternative: External battery

## 3. Software Requirements

### 3.1 Arduino IDE
- https://www.arduino.cc/en/software
- write code and upload it to the board
- support of external libraries

### 3.2 Edge Impulse Platform
- https://www.edgeimpulse.com/
- offers end-to-end deep learning solution for edge ai devices
- free for individuals

### 3.3 Chrome Web Browser
- Web browser that supports bluetooth low energy (BLE)
- for recording and visualization of data^

### 3.4 Python Environment
- for resampling of time series data

## 4. Steps to Reproduce

### 4.1 Record Training Data
- record accelerometer data (x, y, z) while doing exercises using script at `arduino-recorder/acc_ble.ino`
- board in pocket connected to power bank
- sending data over Bluetooth Low Energy (BLE) from the board to a web app running in my browser and storing it as .csv files on my local machine
- repository of ble-recorder: https://github.com/LudwigStumpp/ble-recorder

### 4.2 Resample Training Data to constant sampling rate
- here: aiming for constant 20ms timesteps in recording data
- create virtual Python environment of your choice and install dependencies listed in `requirements.txt`
- move all your `training.csv` files in the folder `python-resampler/in`
- cd into `python-resampler`
- run `python resample.py`
- find resamples data in folder `python-resampler/out`

### 4.3 Upload Training Data to Edge Impulse and Train Classifier
- data uploaded to [Edge Impulse Platform](https://www.edgeimpulse.com/)
- follow proposed steps to train a classifier based on the data

### 4.4 Export Model as external Arduino Library and Download
- compile the trained into Arduino library using the Edge Impulse deployment features
- integrate this external library into Arduino IDE by installing from .zip file
- library can here be found under `arduino-classifier`

### 4.5 Make changes to the provided Demo to send Prediction over BLE
- this results in the file `arduino-classifier/examples/workout_classification.ino`
- creates BLE central station that published prediction results

### 4.6 Open Web Dashboard to track the Workout
- open `web-client/index.html` in your Chrome browser
- and start the recording

## 5. Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also feel free to contact me on Twitter if you have any questions or issues.

## 6. License
This software is licensed under [MIT](https://choosealicense.com/licenses/mit/).
All source code under `arduino-classifier` is provided and licensed by EdgeImpulse Inc. under MIT.