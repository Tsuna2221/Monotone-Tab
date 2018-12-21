const randString = (length) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = ''

    for (var i = 0; i < length; i++) {
        var char = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(char,char+1);
    }

    return randomstring
}

export default randString;