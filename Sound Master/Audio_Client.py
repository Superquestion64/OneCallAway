# Created by Charles Vega
# Last Modified October 12, 2021
# This program is effectively a client side voice call application
# It will create a client that records audio and sends it to a server computer in real time
# The client can only connect to the server computer, but it can receive audio data to play from the server
# Recorded audio from the user's default input device is sent to the server's default output device
# Users must signal for this program to terminate by entering any value
# Dependencies: PyAudio


import pyaudio
import socket
import threading
import concurrent.futures
import queue
import time

# 2048 bytes of data is sent at a time
MSG_LENGTH = 2048
#Create the client and connect to the server
ADDR = (socket.gethostbyname(socket.gethostname()), 5050)
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)

# Will record audio indefinitely until told to terminate
# Recorded audio is sent to the server
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @terminate is an event to terminate this thread
def record(pa, device_info, terminate):
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
        client.send(stream_in.read(stream_in._frames_per_buffer))
    # End audio recording and deallocate audio resources
    stream_in.stop_stream()
    stream_in.close()
    print("Recording Finished")

# Will play audio sent from the server
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @terminate is an event to terminate this thread
def play(pa, device_info, terminate):
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
    while not terminate.is_set():
        # Play the audio sent through audio_stream
        try:
            stream_out.write(client.recv(MSG_LENGTH))
        except socket.error:
            terminate.set()
    # End audio playback and deallocate audio resources
    stream_out.stop_stream()
    stream_out.close()
    print ("Playback finished, ending connection to server")

# Waits for user input, then sets terminate to true
# @terminate is an event shared between each thread to end the program
def user_input(terminate):
    # Wait 1 second
    time.sleep(1)
    # Request user signal to terminate
    input("Enter any value to end the connection: ")
    # Set terminate to true
    terminate.set()

# Initiate a PyAudio object
pa = pyaudio.PyAudio()
# Save the information of the user's default audio devices
device_info = pa.get_default_host_api_info()
# Event which tells recorder and player threads to stop
terminate = threading.Event()
# Create three threads
# First thread records audio from the client's default input device
# Second thread sends recorded audio to the server
# Third thread will tell all threads to terminate when given input
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    # Record
    executor.submit(record, pa, device_info, terminate)
    # Play
    executor.submit(play, pa, device_info, terminate)
    # Terminate
    executor.submit(user_input, terminate)
pa.terminate()
client.close()