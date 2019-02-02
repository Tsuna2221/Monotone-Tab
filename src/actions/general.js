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


const randomColor = () => {
    var color = "#"
    var digit = ["a", "b", "c", "d", "e", "f", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    for(var i = 0; i < 6; i++){
      color += digit[Math.floor(Math.random() * (digit.length - 0) + 0)]
    }
    return color
}

// $("[class*='custom']").each((i, el) => {
//     if(document.querySelector(".custom-t-body-bg")){
//         el.style.backgroundColor = localStorage.getItem('t-background')
//     }
// })

export {randString, hideModal, randomColor}
