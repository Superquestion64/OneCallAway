// async function getLocalStorageValue(key) {
//   return new Promise((resolve, reject) => {
//     try {
//       chrome.storage.sync.get(key, function (value) {
//         resolve(value[key]);
//       });
//     } catch (ex) {
//       reject(ex);
//     }
//   });
// }

// async function run() {
//   let r = await getLocalStorageValue("keybind");
//   console.log("Keybind is set to " + r);
//   document.getElementById("yourKey").innerHTML = r;
//   return r;
// }

// run();

// document.querySelector("form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   key = document.getElementById("kb").value;

//   chrome.storage.sync.set({ keybind: key }, function () {
//     console.log("Keybind is now set to " + key);
//   });

//   document.getElementById("yourKey").innerHTML = key;
// });

let key = "";

/**
 * A function that accesses the call key and then changes the information on the dom
 */
function updatePopup() {
  chrome.storage.sync.get(["callKey"], function (data) {
    document.getElementById("C-K").innerText = data.callKey;
    key = data.callKey;
  });
}

// document.getElementById("C-K").onmouseover = function () {
//   console.log("something happened");
//   navigator.clipboard.writeText(key).then(() => {
//     console.log(`"${key}" was copied to clipboard.`);
//   });
// };

/**
 * The listener that updates the extensions dom using updatePopup
 */
document.addEventListener("DOMContentLoaded", updatePopup);

// function timedRefresh(timeoutPeriod) {
//   setTimeout(function () {
//     location.reload(true);
//   }, timeoutPeriod);
//   console.log("refreshed");
// }

// window.onload = timedRefresh(650);
