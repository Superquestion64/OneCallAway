# One Call Away: Create a Voice Call
The folder 'Sound Master' has a series of audio programs with different uses. Audio_Server.py and Audio_Client.py will connect two computers in a voice call
- Audio_Server.py should be run on the server computer, the server computer will accept connections from clients
- Audio_Client.py should be run on the client computer, the client will attempt to connect to the server
- Once connected, the server will send audio from its default input device to the client's default output device, and the client vice versa
- Audio_Client.py is run by simply using: 'python Audio_Client.py'
- Audio_Server.py has a start() function which will boot up the program. Import Audio_Server.py into any python program and run this function to create a server
- *Note:* Both programs are dependent on PyAudio, the IP address of the server **must** be provided in Audio_Client.py, and all firewalls should be disabled

## Sync_Audio.py
This program will record and play audio to and from the user's default audio devices simultaneously. Effectively, the user will hear themself talk in real time
- By using threads audio input and output is processed concurrently
- Sync_Audio.py runs indefinitely, but it will terminate when given any user input
- Sync_Audio.py is dependent on PyAudio

## Audio_Player.py and Audio_Recorder.py
These programs are able to record audio from a user's default input device, save it as a wav file, and play any wav files inside its directory
- Audio_Recorder.py records audio, Audio_Player.py plays wav files
- Audio_Player.py and Audio_Recorder.py respectively have one function, play and record. To run either program, import Audio_Player.py or Audio_Recorder.py into a python program and run their functions
- The programs run automatically when given user input, and share the same dependencies, PyAudio and wave

## __main__.py
Located in the '__main__' folder, __main__.py is an example file for running the audio programs. When run, the user is given several choices to indicate which audio program they would like to play
- Choice 0 will run Audio_Recorder.py and record audio from their default input device 
- Choice 1 will run Audio_Player.py and play audio from a given wav file
- Choice 2 will run Sync_Audio.py, which records and plays audio to and from the user's default audio devices simultaneously
- Choice 3 will run Audio_Server.py, creating a server from the user's computer. The server then waits for a client computer using Audio_Client.py to establish a voice call

## PyAudio installation
PyAudio cannot be installed using 'pip install PyAudio' for modern python versions as it has not been updated.
To install PyAudio the proper wheel file must be manually downloaded for your computer architecture and python version
- The wheel file can be found at https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
- Once the correct wheel file is downloaded, simply run 'pip install c:\Users\username\Downloads\wheel_file_name'

