Drone Survey Management System

Overview

The Drone Survey Management System is a web-based platform designed for planning, executing, and tracking drone survey missions in real time. The system includes features for mission management, fleet management, real-time tracking using MQTT, and reporting.

Technologies Used

Frontend: Angular

Backend: Flask

Database: MongoDB

Messaging Protocol: MQTT for real-time communication

Features

1. Mission Management

Create, update, and delete missions

View mission progress and status updates

2. Fleet Management

Add, update, and remove drones from the fleet

Assign drones to specific missions

3. Real-Time Tracking

Live location updates via MQTT

Monitor drone telemetry and mission progress

4. Reporting

Fetch and display detailed reports for each mission

Export mission logs for analysis

Installation & Setup

Prerequisites

Node.js and npm (for Angular frontend)

Python & Flask (for backend)

MongoDB (database)

MQTT Broker (such as Mosquitto or EMQX)

Backend Setup (Flask)

Clone the repository:

git clone https://github.com/nishabourde/drone-survey-frontend.git
cd drone-survey/backend

Create a virtual environment and install dependencies:

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt

Start the Flask server:

flask run

Frontend Setup (Angular)

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the Angular development server:

ng serve

MQTT Broker Setup

Install and configure an MQTT broker such as Mosquitto.

Ensure drones publish mission updates to the correct MQTT topics.

API Endpoints

Endpoint

/missions -> GET -> Fetch all missions

/missions -> POST -> Create a new mission

/missions/:id -> PUT -> Update an existing mission

/missions/:id -> DELETE -> Delete a mission

/drones -> GET -> Fetch all drones

/drones -> POST -> Add a new drone

/drones/:id -> PUT -> Update a drone

/drones/:id -> DELETE ->Remove a drone

Design Decisions & Architecture

1. Microservices Architecture

The backend is modular, with separate services for mission management and fleet management.

This ensures scalability and maintainability.

2. MQTT for Real-Time Communication

MQTT is chosen over WebSockets for lightweight and efficient real-time tracking.

This allows drones to publish telemetry data, and the UI updates accordingly.

3. MongoDB for NoSQL Flexibility

Since mission data and drone logs are semi-structured, MongoDB provides flexibility and performance.

AI Tools Used & Impact

1. ChatGPT (AI Assistance for Development)

Used for generating boilerplate code and debugging issues.

Helped optimize API design and improve efficiency.

2. AI-Based Data Analysis (Future Integration)

Planning to integrate AI models to analyze drone telemetry and optimize survey routes.

Future Improvements

Automated Mission Scheduling using AI algorithms.

Integration with GIS tools for better visualization.

Enhanced reporting with predictive analytics.


License
NA
>>>>>>> c06edde (Initial commit - Drone Survey Frontend)
