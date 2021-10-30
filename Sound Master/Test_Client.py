# Created by Charles Vega
# Last Modified October 30, 2021
# This program will connect to OCA's voice call server as a client
# The client will have access to their own local version of the web app through flask
# To connect to the voice call server, the client will have to enter OCA's /voice_call page
# When two clients are connected to the server, they will be joined in a voice call
# Recorded audio from the client's default input device is sent to the other client's default output device, and vice versa
# Users must signal for the client to end connection with the server by entering any value
# Dependencies: PyAudio, Flask

import pyaudio
import socket
import threading
import concurrent.futures
import time
from flask import Flask, render_template, redirect, url_for, request

# Create the client and connect to the server
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# This is configured to connect only to local networks
ADDR = ('192.168.1.3', 7777)
print("Connecting to the server...")
client.connect(ADDR)
print("Connection successful")
# The client will not run until the server sends a message
msg = client.recv(100)
print(msg.decode("utf-8"))

# This flag will only let the client enter one voice call
connected = True
# 2048 bytes of data is sent at a time, frames_per_buffer * 2
MSG_LENGTH = 2048

app = Flask(__name__, static_url_path='', template_folder='static')

# Display the web app for the user


@app.route('/')
@app.route('/signup')
@app.route('/signin')
@app.route('/dashboard')
def home():
    return app.send_static_file('index.html')

# Will record audio indefinitely until told to terminate
# Recorded audio is sent to the server, and passed to the other client
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @terminate is an event to terminate the voice call


def send_audio(pa, device_info, terminate):
    stream_in = pa.open(
        # Sampling frequency
        rate=44100,
        # Mono sound
        channels=2,
        # 16 bit format, each word is 2 bytes
        format=pyaudio.paInt16,
        input=True,
        # Default device will be used for recording
        input_device_index=device_info["defaultInputDevice"],
        frames_per_buffer=1024
    )
    print("Sending audio to the server...")
    # Will loop until the user signals for the program to terminate
    while not terminate.is_set():
        try:
            # Record audio and send it to the server
            client.send(stream_in.read(stream_in._frames_per_buffer))
        except socket.error:
            print("AUDIO SEND ERORR")
            terminate.set()
            break
    # End audio recording and deallocate audio resources
    # Disconnect from the audio server
    print("Ending Connection with Server")
    client.close()
    stream_in.stop_stream()
    stream_in.close()
    print("Audio Recording Finished")

# Will play audio sent from the other client
# @pa is a PyAudio object
# @device_info has the user's audio device information
# @terminate is an event to terminate the voice call


def receive_audio(pa, device_info, terminate):
    stream_out = pa.open(
        # Set the sample format and length
        format=pyaudio.paInt16,
        channels=2,
        # Set the sampling rate
        rate=44100,
        output=True,
        # Play to the user's default output device
        output_device_index=device_info["defaultOutputDevice"],
        # Set the buffer length to 1024
        frames_per_buffer=1024
    )
    print("Receiving audio from the server...")
    # Will loop until the server or client disconnects
    while not terminate.is_set():
        # Play the audio sent by the server
        try:
            stream_out.write(client.recv(MSG_LENGTH))
        except socket.error:
            print("AUDIO RECEIVE ERROR")
            terminate.set()
            break
    # End audio playback and deallocate audio resources
    stream_out.stop_stream()
    stream_out.close()
    print("Audio Playback Finished")

# Waits for user input, then sets terminate to true
# @terminate is an event shared between each thread to end the voice call


def user_input(terminate):
    # Wait 2 seconds
    time.sleep(2)
    # Request user signal to terminate
    print("Voice call succesfully created")
    input("At any point press enter to leave the voice call ")
    # Set terminate to true
    terminate.set()

# This function is only allowed to run once, this is moderated by the bool connected
# When the client enters the /voice_call page they will enter a voice call with another client
# This function will wait until there is another client to voice call with


@app.route('/voice_call')
def start():
    global connected
    if (connected):
        # This function will only run once
        connected = False
        print("Waiting for a response from the server...")
        # The voice call cannot be started until the second client connects
        # The server will know when this happens
        client.recv(100)
        msg = client.recv(100)
        print(msg.decode("utf-8"))
        # Initiate a PyAudio object
        pa = pyaudio.PyAudio()
        # Save the information of the user's default audio devices
        device_info = pa.get_default_host_api_info()
        # Event which tells every thread to end
        terminate = threading.Event()
        # Create three threads
        # First thread thread sends recorded audio to the server intended for the other client
        # Second thread plays audio from the server passed by the other client
        # Third thread will tell all threads to terminate when given input
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            # Record
            executor.submit(send_audio, pa, device_info, terminate)
            # Play
            executor.submit(receive_audio, pa, device_info, terminate)
            # Terminate
            executor.submit(user_input, terminate)
        pa.terminate()
    return app.send_static_file('index.html')


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.submit(app.run)
