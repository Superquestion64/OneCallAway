# One Call Away: Create a Voice Call Through Python
Audio_Server.py and Audio_Client.py will connect two computers in a voice call
- Audio_Server.py should be run on the server computer, the server computer will accept connections from clients
- Audio_Client.py should be run on the client computer, the client will attempt to connect to the server
- Once two clients connect to the server and navigate to the /voice_call page on OCA's web app, the server will exchange audio between each client establishing a voice call
- As Audio_Client.py is dependent on OCA's web app, make sure the web app is properly built by going to ../web and running 'npm run build'
- Audio_Client.py is run by simply using: 'python Audio_Client.py'
- Similarly Audio_Server.py is run by: 'python Audio_Server.py'
- **Note:** Both programs are dependent on PyAudio, the IP address of the server **must** be provided in Audio_Client.py, and all firewalls should be disabled

## Sync_Audio.py
This program will record and play audio to and from the user's default audio devices simultaneously. Effectively, the user will hear themself talk in real time, this can be used to test PyAudio
- By using threads audio input and output is processed concurrently
- Sync_Audio.py runs indefinitely, but it will terminate when given any user input
- Sync_Audio.py is dependent on PyAudio

## Audio_Player.py and Audio_Recorder.py
These programs are able to record audio from a user's default input device, save it as a wav file, and play any wav files inside its directory
- Audio_Recorder.py records audio and saves it as a wav file, Audio_Player.py plays wav files
- Audio_Player.py and Audio_Recorder.py respectively have one function, play and record. To run either program, import Audio_Player.py or Audio_Recorder.py into a python program and run their functions
- Audio_Recorder.py takes the number of seconds to be recorded as a parameter for its record function
- Audio_Player.py takes the file name to be played for its play function
- Both programs share the same dependencies, PyAudio and wave

## PyAudio installation
PyAudio cannot be installed using 'pip install PyAudio' for modern python versions as it has not been updated.
To install PyAudio the proper wheel file must be manually downloaded for your computer architecture and python version
- The wheel file can be found at https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
- Once the correct wheel file is downloaded, simply run 'pip install c:\Users\username\Downloads\wheel_file_name'

