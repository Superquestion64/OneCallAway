document.getElementById("yourKey").innerHTML = chrome.storage.sync.get(
  ["keybind"],
  function (data) {
    console.log(data.keybind);
    x = false;
    return data.keybind;
  }
);

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  let key = document.getElementById("kb").value;

  chrome.storage.sync.set({ keybind: key }, function () {
    console.log("Keybind is set to " + key);
  });

  document.getElementById("yourKey").innerHTML = key;
  //console.log(key);
});
