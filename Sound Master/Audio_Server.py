# Created by Charles Vega
# Last Modified October 15, 2021
# This program is effectively a server side voice call application
# It will create a server that records audio and sends it to a client computer in real time
# The server can connect to multiple computers and also receive audio data to play from the clients
# Recorded audio from the server's default input device is sent to the client's default output device
# Users must signal for this program to terminate by entering any value
# Dependencies: PyAudio

import pyaudio
import socket
import threading
import concurrent.futures
import queue
import time 
from flask import Flask, render_template

app = Flask(__name__, template_folder='public')

@app.route('/')
@app.route('/dashboard')
@app.route('/signup')
@app.route('/signin')
def index():
    return render_template('index.html')

# 2048 bytes of data is sent at a time
MSG_LENGTH = 2048
# Create a socket object for internet streaming through IPV4
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# (IPV4 address, free port number)
SERVER = (socket.gethostbyname(socket.gethostname()), 7777)
server.bind(SERVER)

# Will record audio indefinitely until told to terminate
# Recorded audio is put inside a queue which will be sent to the client
# @stream_in is a PyAudio object that reads from the server's default input device
# @audio_stream is a queue to hold recorded audio from the server
# @terminate is an event to terminate this thread
def record(stream_in, audio_stream, terminate):
    print("Recording in progress...")
    # Will loop until the user signals for the program to terminate
    while not terminate.is_set():
        audio_stream.put(stream_in.read(stream_in._frames_per_buffer))
    # End audio recording and deallocate audio resources
    stream_in.stop_stream()
    stream_in.close()
    print("Voice call finished")

# Will play audio sent from a client
# If the client disconnects this function terminates
# @pa is a PyAudio object
# @connection and address identify the client
# @stream_out is a PyAudio object that writes to the server's default output device
# @terminate is an event to terminate this thread
def receive_audio(connection, address, stream_out, terminate):
    print(f"Receiving audio from {address}")
    # Will loop until terminate is true or the client disconnects
    while not terminate.is_set():
        # Receive and play the audio from the client
        try:
            stream_out.write(connection.recv(MSG_LENGTH))
        except socket.error:
            print(f"AUDIO RECEIVE ERROR from {address}")
            break

    print (f"Playback finished from {address}")

# Waits for user input, then sets terminate to true
# @terminate is an event shared between each thread to end the program
def user_input(terminate):
    # Wait 1 second
    time.sleep(1)
    # Request user signal to terminate
    input("At any point press enter to terminate the server ")
    # Set terminate to true
    terminate.set()

# Will send audio to the client from the audio queue
# @connection and address identify the client
# @audio_stream is a queue of recorded audio from the server
# @terminate is an event to terminate this thread
def send_audio(connection, address, audio_stream, terminate):
    while not terminate.is_set():
        try:
            # Send the recorded audio data to the client
            connection.send(audio_stream.get())
        except socket.error:
            # Close connection with the client when a send fails
            connection.close()
            print(f"Connection lost with {address}")
            break

# WIP Function
# This function handles multiple clients
# @stream_out is a PyAudio object that writes to the server's default output device
# @audio_stream is a queue of recorded audio from the server
# @terminate is an event to terminate this thread
def handle_clients(stream_out, audio_stream, terminate):
    # Wait for a new client
    print ("Waiting for a new client...")
    connection, address = server.accept()
    # Create threads to send and receive audio from the new client
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.submit(send_audio, connection, address, audio_stream, terminate)
        executor.submit(receive_audio, connection, address, stream_out, terminate)
        while not terminate.is_set():
            # Wait for a new client
            connection, address = server.accept()
            # Create threads to send and receive audio from the new client
            executor.submit(send_audio, connection, address, audio_stream, terminate)
            executor.submit(receive_audio, connection, address, stream_out, terminate)

# Main runner function of the server
# Will wait for a client then dedicate audio resources from the server for the program
# When one client connects to the server a voice call between two computers is made
# Multiple clients can connect to the server through handle_clients
@app.route('/my_flask_function')
def start():
    print("Starting the server...")
    # Open the server for connections
    server.listen()
    print(f"Server is accepting clients on {SERVER}")
    # Initiate a PyAudio object
    pa = pyaudio.PyAudio()
    # Save the infromation of the user's default audio devices
    device_info = pa.get_default_host_api_info()
    # Queue for audio data
    audio_stream = queue.Queue()
    # Event which tells all threads to stop
    terminate = threading.Event()
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
    return render_template('index.html')
    audio_stream = queue.Queue()
    # Wait for a client to connect
    connection, address = server.accept()

    # Make 5 threads
    # First thread records audio from the server's default input device
    # Second thread receives audio from the client and plays it to the server's default output device
    # Third thread sends audio from the server to the client
    # Fourth thread will terminate the above threads
    # Fifth thread will create more threads for additional clients. This feature is WIP
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Record
        executor.submit(record, stream_in, audio_stream, terminate)
        # Play
        executor.submit(receive_audio, connection, address, stream_out, terminate)
        # Send audio
        executor.submit(send_audio, connection, address, audio_stream, terminate)
        # Terminate
        executor.submit(user_input, terminate)
        # Add clients
        #executor.submit(handle_clients, stream_out, audio_stream, terminate)
    # Deallocate audio recources
    stream_out.stop_stream()
    stream_out.close()
    pa.terminate()

if __name__ == "__main__":
    app.run(debug=True)
