# Created by Charles Vega
# Last Modified October 9, 2021
# This is the main runner for the audio programs. There are 3 choices
# Choice 0 will record audio and choice 1 will play audio
# Choice 2 will record and play audio to and from the user's default audio devices simultaneously

import pyaudio
import Audio_Player
import Audio_Recorder
import Sync_Audio
import queue
import concurrent.futures
import threading

choice = int(input("Enter '0' to record audio, enter '1' to play audio, or enter '2' to run Sync_Audio: "))
if (choice == 0):
    # Get the number of seconds to record and record audio
    Audio_Recorder.record(int(input("Seconds to be recorded: ")))
elif (choice == 1):
    # Retrieve the name of the audio file and play audio
    Audio_Player.play(input("Enter the name of the audio file: "))
elif (choice == 2):
    # Initiate a PyAudio object
    pa = pyaudio.PyAudio()
    # Save the infomration of the user's default audio devices
    device_info = pa.get_default_host_api_info()
    # Queue for audio data
    audio_stream = queue.Queue()
    # Event which tells recorder and player threads to stop
    terminate = threading.Event()
    # Run three threads, one to record audio, one to play audio, the other to terminate the program
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        # Record
        executor.submit(Sync_Audio.record, pa, device_info, audio_stream, terminate)
        # Play
        executor.submit(Sync_Audio.play, pa, device_info, audio_stream, terminate)
        # Terminate
        executor.submit(Sync_Audio.user_input, terminate)
    # Delete the PyAudio object
    pa.terminate()
else:
    # Error
    print("Invalid Choice")
