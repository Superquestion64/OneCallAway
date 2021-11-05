/**
 * Takes in the length of key that is generated randomly
 * 
 * @param {int} length 
 * @returns {string} output
 */
function getRandomString(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let output = "";
  for (let i = 0; i < length; i++) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return output;
}

/**
 * Takes in the current key generated and sends a notification
 * 
 * @param {string} currentKey 
 */
function notification(currentKey) {
  chrome.notifications.create({
    title: "KEY",
    message: "Call is generating using " + currentKey,
    iconUrl: "icon_128.png",
    type: "basic",
  });
}

/**
 * When the user clicks the notification regarding the call generation,
 * it will create a tab taking you to the voice call
 */
function onClickNotification() {
	chrome.tabs.create({
		url: "http://127.0.0.1:5000/signin"
	});
}

/**
 * Function to copy the generated key to the clipboard for easy access whenever
 * 
 * @param {string} callKey
 */
// function copyToClipboard(callKey) {
//   navigator.clipboard
//     .writeText(callKey)
//     .then(() => {
//       // Success!
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err);
//     });
// }

/**
 * The listener that always waits for the keybind indput then runs the other functions
 */
chrome.commands.onCommand.addListener(() => {
  let key = getRandomString(20);
  console.log(key);
  chrome.storage.sync.set({ callKey: key });
  notification(key);
  chrome.notifications.onClicked.addListener(onClickNotification);
  //copyToClipboard(key);
});
