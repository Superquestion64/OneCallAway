# Created by Charles Vega
# Last Modified October 23, 2021
# This program will boot up OCA's Web App and implement the Make a Call button
# The Make a Call button currently runs Sync_Audio
# It will record and play audio simultaneously through the use of threads and pyaudio
# Recorded audio from the user's default input device gets sent to the user's default output device
# Users must signal for this program to terminate by entering any value
# Dependencies: PyAudio, Flask

import pyaudio
import time
import threading
import concurrent.futures
import queue
from flask import Flask, render_template

app = Flask(__name__, static_url_path='', template_folder='static')  
# Event which tells recorder and player threads to stop
terminate = threading.Event()

# Default directory, website landing page
@app.route('/')
def home():
    # Exit all audio threads
    global terminate
    terminate.set()
    return app.send_static_file('index.html')

# When the user leaves the /voice_call page, exit the voice call
@app.route('/signup')
@app.route('/signin')
@app.route('/dashboard')
def exit():
    # Exit all audio threads
    global terminate
    terminate.set()
    return app.send_static_file('index.html')

# Will record audio indefinitely until told to terminate
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @audio_stream is a queue to transfer audio data between threads
# @terminate is an event to terminate this thread
def record(pa, device_info, audio_stream):
    global terminate
    stream_in = pa.open(
        # Sampling frequency
        rate = 44100,
        # Mono sound
        channels = 1,
        # 16 bit format, each word is 2 bytes
        format = pyaudio.paInt16,
        input = True,
        # Default device will be used for recording
        input_device_index = device_info["defaultInputDevice"],
        frames_per_buffer = 1024
    )
    print("Recording in progress...")
    # Will loop until the user signals for the program to terminate
    while not terminate.is_set():
        # Record audio and send it to audio_stream
        audio_stream.put(stream_in.read(stream_in._frames_per_buffer))
    # End audio recording and deallocate audio resources
    stream_in.stop_stream()
    stream_in.close()
    print("Recording Finished")

# Will play all the audio sent from the record thread
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @audio_stream is a queue to transfer audio data between threads
# @terminate is an event to terminate this thread
def play(pa, device_info, audio_stream):
    global terminate
    stream_out = pa.open(
        # Set the sample format and length
        format = pyaudio.paInt16,
        channels = 1,
        # Set the sampling rate
        rate = 44100,
        output = True,
        # Play to the user's default output device
        output_device_index = device_info["defaultOutputDevice"],
        # Set the buffer length to 1024
        frames_per_buffer = 1024
    )
    print("Playing Audio...")
    # Will loop until there is no more remaining audio in audio_stream
    while not terminate.is_set() or not audio_stream.empty():
        # Play the audio sent through audio_stream
        stream_out.write(audio_stream.get())
    # End audio playback and deallocate audio resources
    stream_out.stop_stream()
    stream_out.close()
    print ("Playback finished")

# Refresh the voice_call page to run audio_start
@app.route('/voice_call')
def audio_start():
    # Give record and player threads permission to run
    global terminate
    terminate.clear()
    # Initiate a PyAudio object
    pa = pyaudio.PyAudio()
    # Save the information of the user's default audio devices
    device_info = pa.get_default_host_api_info()
    # Queue for audio data
    audio_stream = queue.Queue()
    # Run two threads, one to record audio and the other to play audio
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        # Record
        executor.submit(record, pa, device_info, audio_stream)
        # Play
        executor.submit(play, pa, device_info, audio_stream)
    # Delete the PyAudio object
    pa.terminate()
    return app.send_static_file('index.html')

if __name__ == '__main__':
	app.run()

