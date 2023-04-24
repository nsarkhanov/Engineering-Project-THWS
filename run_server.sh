#!/bin/bash




# Open new terminal tab to activate virtual environment
gnome-terminal --tab --title="backen server" -- /bin/bash -c "node mongodb/server.js; exec bash"

# Open new terminal tab to run Python script
gnome-terminal --tab --title="Run Python script" -- /bin/bash -c "source venv/bin/activate; python backend/main.py; exec bash"

