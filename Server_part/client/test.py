from client import Client
import time
from threading import Thread

#random names for testing purposes
c1 = Client("bot-dummy1")

c2 = Client("name")


def update_messages():
    """
    updates the local list of messages
    :return: None
    """
    msgs = []
    run = True
    while run:
        # update chat list to be relevant for less then a second
        time.sleep(0.1)
        #  obtain new messages from client
        new_messages = c1.get_messages()
        # append to current messages
        msgs.extend(new_messages)
        # print out all new messages
        for msg in new_messages:
            print(msg)

            if msg == "{quit}":
                run = False
                break


Thread(target=update_messages).start()

c1.send_message("Howdy!")
time.sleep(3)
c2.send_message("Hey!")
time.sleep(3)
c1.send_message("what is up with you?")
time.sleep(3)
c2.send_message("Nothing much,, the same old as always")
time.sleep(3)
#simulated logout
c1.disconnect()
time.sleep(2)
c2.disconnect()
