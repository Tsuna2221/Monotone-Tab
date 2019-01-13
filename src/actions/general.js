const randString = (length) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = ''

    for (var i = 0; i < length; i++) {
        var char = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(char,char+1);
    }

    return randomstring
}

const hideModal = (obj, event) => {
    var { prefix, element, button } = obj
    var p = prefix
    var e = document.querySelector(element)
    var i = document.querySelector('.' + prefix)
    var b = document.querySelector(button)

    if (!i && event.target !== b && !event.target.closest(element)){
        e.classList.toggle(p)
    };
}

export {randString, hideModal}
