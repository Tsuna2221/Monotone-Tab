const returnFolders = () => {
    var items = [];

    for(var data in localStorage){
        if(data.includes('folder')){
            if(localStorage.getItem(data) && JSON.parse(localStorage.getItem(data)).name){
                items.push(JSON.parse(localStorage.getItem(data)))
            }
        }
    }

    return items.sort((a, b) => parseInt(a.id.replace(/\D/g ,'')) - parseInt(b.id.replace(/\D/g ,'')))
}

const returnLinks = (currentFolder) => {
    var items = [];
        
    for(var data in localStorage){
        if(data.includes('item') ){
            var itemIndex = JSON.parse(localStorage.getItem(data)).folder
            var currentFolder = currentFolder
            if(itemIndex === currentFolder){
                items.push(JSON.parse(localStorage.getItem(data)))
            }
        }
    }

    return items.sort((a, b) => parseInt(a.id.replace(/\D/g ,'')) - parseInt(b.id.replace(/\D/g ,'')))
}

const returnLastFolder = () => {
    var items = []
    for(var data in localStorage){
        if(data.includes('folder')){
            if(localStorage.getItem(data) !== null){
                items.push(parseInt(data.replace('folder', '')))
            }
        }
    }

    return items
}

const returnLastLink = () => {
    var items = [];
    var highestValues = [];

    for(var data in localStorage){
        if(data.includes('item')){
            if(localStorage.getItem(data) !== null){
                items.push(JSON.parse(localStorage.getItem(data)))
                highestValues.push(parseInt(data.replace('item', '')))
            }
        }
    }

    return {items, highestValues}
}

export {returnFolders, returnLinks, returnLastLink, returnLastFolder}