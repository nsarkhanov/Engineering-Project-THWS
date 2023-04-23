#!/bin/bash
# Activate virtual environment
source venv/bin/activate
# Run main.py
python backend/main.py
sleep 52
# Run node server.js in the background
node mongodb/server.js &
# Wait for 2 seconds
sleep 2


