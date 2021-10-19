function getRandomString(length) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let output = '';
    for ( let i = 0; i < length; i++ ) {
        output += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return output;
}

chrome.commands.onCommand.addListener(() => {
    console.log(getRandomString(20));
});