
let key = ""

/*
fetch('key.txt')
  .then(response => response.text())
  .then((data) => {
    key = data;
  })
*/

function updateKeybind(event) {
    event.preventDefault();

    key = document.getElementById("kb").value;

    let fso = new ActiveXObject("Scripting.FileSystemObject");
    let fh = fso.CreateTextFile("key.txt", 8, true);
    fh.WriteLine(key);
    fh.Close();
    console.log(key)
};