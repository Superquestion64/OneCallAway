# Created by Charles Vega
# Last Modified October 29, 2021
# This will boot up OCA's voice call server
# The server will wait for pairs of clients who wish to join a voice call
# For every two clients who connect to the server, a new voice call is made
# Users must signal for the server to stop accepting new clients by entering any value

import socket
import threading
import concurrent.futures
import time

# 2048 bytes of data is sent at a time
MSG_LENGTH = 2048
# Create a socket object for internet streaming through IPV4
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# (IPV4 address, free port number)
SERVER = ('', 7777)
server.bind(SERVER)

# Waits for user input, then sets terminate to true
# @terminate is an event shared between each thread to end the program


def user_input(terminate):
    # Wait 1 second
    time.sleep(1)
    # Request user signal to terminate
    input("At any point press enter to stop accepting new connections \n")
    # Set terminate to true
    terminate.set()

# exchange_audio will always be called by two threads at a time
# In one thread audio from connection1 gets sent to connection2
# In the other, audio from connection2 gets sent to connection1
# When either client disconnects or the server wishes to terminate, both connections will close automatically
# @connection1 and connection2 are two seperate clients who wish to join in a voice call
# @address indicates the IP address of a thread's connection1
# @terminate will tell this function to close


def exchange_audio(connection1, connection2, address, terminate):
    print(f"Receiving audio from {address}")
    # Will loop until terminate is true
    while not terminate.is_set():
        try:
            connection2.send(connection1.recv(MSG_LENGTH))
        except socket.error:
            # Close connection with the client when a send fails
            connection1.close()
            print(f"Connection lost with {address}")
            break
    print(f"Ending connection with {address}")

# Main runner function of the server
# Will wait for two clients at a time then join them in a voice call
# Each voice call will take two threads to manage
# One thread will receive audio from one client then send it to the other
# The second thread will perform the same task as the first thread but in reverse direction


def start():
    print("Starting the server...")
    # Open the server for connections
    server.listen()
    print(f"Server is accepting clients on {SERVER}")
    # Event which tells all threads to stop
    terminate = threading.Event()
    # Wait for the first client to connect
    print("Waiting for the first client to connect...")
    connection1, address1 = server.accept()
    connection1.send(bytes(
        "Your friend should be connecting to the server soon! Feel free to check out the web app!", "utf-8"))
    print(f"Connection successful with {address1}")
    # Wait for the second client to connect
    print("Waiting for the second client to connect...")
    connection2, address2 = server.accept()
    connection2.send(bytes(
        "Your friend should be connecting to the server soon! Feel free to check out the web app!", "utf-8"))
    print(f"Connection successful with {address2}")
    # Sleeps are necessary so the clients sync up
    # The sends below determine when the clients are both on the /voice_call page
    time.sleep(1)
    connection1.send(
        bytes("Waiting for both clients to access the /voice_call page", "utf-8"))
    connection2.send(
        bytes("Waiting for both clients to access the /voice_call page", "utf-8"))
    time.sleep(1)
    connection1.send(bytes(
        "Your friend is ready to chat! Your voice call should start soon!", "utf-8"))
    connection2.send(bytes(
        "Your friend is ready to chat! Your voice call should start soon!", "utf-8"))
    # Create threads to exchange audio between clients
    # 1 to 1 voice calls are created indefinitely until terminate is set
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Exchange audio data between the clients, creating a call
        executor.submit(exchange_audio, connection1,
                        connection2, address1, terminate)
        executor.submit(exchange_audio, connection2,
                        connection1, address2, terminate)
        # Terminate
        executor.submit(user_input, terminate)
        # This loop will create new 1 to 1 voice calls
        while not terminate.is_set():
            # Wait for a new client
            print("Waiting for two new clients...")
            connection1, address1 = server.accept()
            connection1.send(bytes(
                "Your friend should be connecting to the server soon! Feel free to check out the web app!", "utf-8"))
            print(f"Connection successful with {address1}")
            # Wait for the second client to connect
            print("Waiting for the second client to connect...")
            connection2, address2 = server.accept()
            connection2.send(bytes(
                "Your friend should be connecting to the server soon! Feel free to check out the web app!", "utf-8"))
            time.sleep(1)
            connection1.send(
                bytes("Waiting for both clients to access the /voice_call page", "utf-8"))
            connection2.send(
                bytes("Waiting for both clients to access the /voice_call page", "utf-8"))
            time.sleep(1)
            connection1.send(bytes(
                "Your friend is ready to chat! Your voice call should start soon!", "utf-8"))
            connection2.send(bytes(
                "Your friend is ready to chat! Your voice call should start soon!", "utf-8"))
            print(f"Connection successful with {address2}")
            # Exchange audio data between the clients, creating a call
            executor.submit(exchange_audio, connection1,
                            connection2, address1, terminate)
            executor.submit(exchange_audio, connection2,
                            connection1, address2, terminate)


if __name__ == "__main__":
    start()
