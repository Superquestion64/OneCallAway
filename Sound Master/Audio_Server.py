# Created by Charles Vega
# Last Modified October 12, 2021
# This program is effectively a server side voice call application
# It will create a server that records audio and sends it to a client computer in real time
# The server can connect to multiple computers and also receive audio data to play from the clients
# Recorded audio from the user's default input device is sent to the client's default output device
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
# Create the server and save its address
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, 5050)
server.bind(ADDR)

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
    print("Recording finished")

# Will play audio sent from a client
# If the client disconnects this function terminates
# @pa is a PyAudio object
# @conn and addr identify the client
# @stream_out is a PyAudio object that writes to the server's default output device
# @terminate is an event to terminate this thread
def receive_audio(conn, addr, stream_out, terminate):    
    print(f"Receiving audio from {addr}")
    # Will loop until terminate is true or the client disconnects
    while not terminate.is_set():
        try:
            # Receive and play the audio from the client
            stream_out.write(conn.recv(MSG_LENGTH))
        except socket.error:
            conn.close()
            break
    print (f"Playback finished from {addr}")

# Waits for user input, then sets terminate to true
# @terminate is an event shared between each thread to end the program
def user_input(terminate):
    # Wait 1 second
    time.sleep(1)
    # Request user signal to terminate
    input("Enter any value to end the connection: ")
    # Set terminate to true
    terminate.set()

# Will send audio to the client from the audio queue
# @conn and addr identify the client
# @audio_stream is a queue of recorded audio from the server
# @terminate is an event to terminate this thread
def send_audio(conn, addr, audio_stream, terminate):
    while not terminate.is_set():
        try:
            # Send the recorded audio data to the client
            conn.send(audio_stream.get())
        except socket.error:
            # Close connection with the client when a send fails
            conn.close()
            break

# This function handles multiple clients
# @stream_out is a PyAudio object that writes to the server's default output device
# @audio_stream is a queue of recorded audio from the server
# @terminate is an event to terminate this thread
def handle_client(stream_out, audio_stream, terminate):
    # Wait for a new client
    print ("Waiting for a new client...")
    conn, addr = server.accept()
    # Create threads to send and receive audio from the new client
    with concurrent.futures.ThreadPoolExecutor() as executor:
        executor.submit(send_audio, conn, addr, audio_stream, terminate)
        executor.submit(receive_audio, conn, addr, stream_out, terminate)
        while not terminate.is_set():
            # Wait for a new client
            conn, addr = server.accept()
            # Create threads to send and receive audio from the new client
            executor.submit(send_audio, conn, addr, audio_stream, terminate)
            executor.submit(receive_audio, conn, addr, stream_out, terminate)

# Main runner function of the server
# Will wait for a client then dedicate audio resources from the server for the program
# When one client connects to the server a voice call between two computers is made
# Multiple clients can connect to the server through handle_client
def start():
    print("Starting the server...")
    server.listen()
    print(f"Server is listening on {SERVER}")
    # Initiate a PyAudio object
    pa = pyaudio.PyAudio()
    # Save the infomration of the user's default audio devices
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
    # Wait for a client to connect
    conn, addr = server.accept()
    # Make 5 threads
    # First thread records audio from the server's default input device
    # Second thread receives audio from the client and plays it to the server's default output device
    # Third thread sends audio from the server to the client
    # Fourth thread will terminate the above threads
    # Fifth thread will create more threads for additional clients 
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Record
        executor.submit(record, stream_in, audio_stream, terminate)
        # Play
        executor.submit(receive_audio, pa, conn, addr, stream_out, terminate)
        # Send audio
        executor.submit(send_audio, conn, addr, audio_stream, terminate)
        # Terminate
        executor.submit(user_input, terminate)
        # Add clients
        executor.submit(handle_client, stream_out, audio_stream, terminate)
    # Deallocate audio recources
    stream_out.stop_stream()
    stream_out.close()
    pa.terminate()
