function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

chrome.commands.onCommand.addListener(() => {
    console.log(getRandomString(20));
});

// chrome.storage.local.set({"key": "value"}, function() {
//     console.log('Value is set to ');
// });