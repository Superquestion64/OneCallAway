function getRandomString(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let output = "";
  for (let i = 0; i < length; i++) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return output;
}

function notification(currentKey) {
  chrome.notifications.create({
    title: "KEY",
    message: "Call is generating using " + currentKey,
    iconUrl: "icon_128.png",
    type: "basic",
  });
}

function onClickNotification() {
	chrome.tabs.create({
		url: "https://google.com"
	});
}

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

chrome.commands.onCommand.addListener(() => {
  let key = getRandomString(20);
  console.log(key);
  chrome.storage.sync.set({ callKey: key });
  notification(key);
  chrome.notifications.onClicked.addListener(onClickNotification);
  //copyToClipboard(key);
});
