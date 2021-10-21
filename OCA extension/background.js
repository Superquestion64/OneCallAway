function getRandomString(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let output = "";
  for (let i = 0; i < length; i++) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return output;
}

function copyToClipboard(callKey) {
    callKey.select();
    this.document.execCommand("copy", true);
    console.log(callKey + " is copied to clipboard");
}

chrome.commands.onCommand.addListener(() => {
  let key = getRandomString(20);
  console.log(key);
  chrome.storage.sync.set({ callKey: key });
  copyToClipboard(key);
});

