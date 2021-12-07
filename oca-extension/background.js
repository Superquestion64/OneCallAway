/**
 * Sends a notification
 */
function notification() {
  chrome.notifications.create({
    title: "KEY",
    message: "Your call is generating! Click the notification to be taken to it!",
    iconUrl: "images/icon_128.png",
    type: "basic",
  });
}

/**
 * When the user clicks the notification regarding the call generation,
 * it will create a tab taking you to the voice call
 */
function onClickNotification() {
  chrome.tabs.create({
    url: "https://one-call-away.herokuapp.com/voice_call",
  });
}

/**
 * The listener that always waits for the keybind input then runs the other functions
 */
chrome.commands.onCommand.addListener(() => {
  notification();
  chrome.notifications.onClicked.addListener(onClickNotification);
});
