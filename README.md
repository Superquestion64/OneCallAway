# Sync_Audio.py
This program will record and play audio to and from the user's default audio devices simultaneously
- By using threads audio input and output is processed concurrently
- Sync_Audio.py runs indefinitely, but it will terminate when given any user input
- Sync_Audio.py is dependent on PyAudio

## Audio_Player.py and Audio_Recorder.py 
These programs are able to record audio from a user's default input device, 
save it as a wav file, and play any wav files inside its directory
- Audio_Recorder.py records audio, Audio_Player.py plays wav files
- The programs run automatically when given user input, and share the same dependencies, PyAudio and wave

## PyAudio installation
PyAudio cannot be installed using 'pip install PyAudio' for modern python versions as it has not been updated.
To install PyAudio the proper wheel file must be manually downloaded for your computer architecture and python version
- The wheel file can be found at https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
- Once the correct wheel file is downloaded, simply run 'pip install c:\Users\username\Downloads\wheel_file_name'
- Audio_Player.py and Audio_Recorder.py can then be run as such: 'python Audio_Player.py' and 'python Audio_Recorder.py'
- Similarly Sync_Audio.py is run using: 'python Sync_Audio.py'