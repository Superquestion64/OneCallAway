Audio_Player.py and Audio_Recorder.py are able to record audio from a user's default input device, 
save it as a wav file, and play any wav files inside its directory. 
Audio_Recorder.py records audio, Audio_Player.py plays wav files.
The programs run automatically when given user input, and share the same dependencies, PyAudio and wave.
PyAudio cannot be installed using 'pip install PyAudio' for modern python versions as it has not been updated.
To install PyAudio the proper wheel file must be manually downloaded for your computer architecture and python version.
The wheel file can be found at https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio.
Once the correct wheel file is downloaded, simply run 'pip install c:\Users\ <username> \Downloads\ <wheel file name>'
Audio_Player.py and Audio_Recorder.py can then be run as such: 'python Audio_Player.py' and 'python Audio_Recorder.py'
