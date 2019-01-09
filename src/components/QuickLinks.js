import React, { Component } from 'react';
import p from 'parse-string-data'
import Cookies from 'js-cookie'
import Masonry from 'react-masonry-component';

//Components
import QuickLinkModal from './Modals/QuickLinkSettingModal'
import QuickLinkEdit from './Modals/QuickLinkEditModal'
import Folders from './Folders'

//Images
import OptionButton from "../assets/OptionButton.svg";


class QuickLinks extends Component {
    render() {
        window.onclick = this.closeModal
        return (
            <div id='QuickLinks'>
                <QuickLinkEdit data={this.state.selectedData} lastItem={this.getLastItems()} updateLinksState={this.updateLinksState} linkColors={this.state.linkColors}/>
                <QuickLinkModal folders={this.getFolders} items={this.state.items} selectedFolder={this.state.currentFolder} lastItem={this.getLastItems()} updateLinksState={this.updateLinksState} linkColors={this.state.linkColors}/>
                
                <Folders currentFolder={this.currentFolder} setCurrentFolder={this.setCurrentFolder} updateLinksState={this.updateLinksState}/>

                <div id="quick-main-container">
                    <span className="quick-label head-w">Quick Links</span>            
                    <p className="label-w folder-label">{this.setLabel(this.state.currentFolder)}</p>
                    <Masonry
                        elementType={'div'}
                        options={this.state.masonryOptions}
                        className="quick-container" style={{ gridTemplateColumns: 'repeat( '+ this.initColumnNo() +', 245px )' }}>
                        {this.drawContainer()}
                        <div className="quick-item-container">
                            <div data-id="new-item" onClick={this.showNewModal} className="quick-item empty-item">
                                <div className="item-let empty-let">
                                    <span className="let-ind">+</span>
                                </div>

                                <span className="item-name empty-name">Add New</span>
                            </div>
                        </div>
                    </Masonry>
                </div>
            </div>
        );
    }

    state = {
        currentFolder: 'default',
    }

    componentDidMount = () => {
        if(Cookies.get('isFirstStart') === undefined){
            Cookies.set('noOfColumns', 4)
        }
    }

    drawContainer = () => {
        var items = [];
        for(var data in localStorage){
            if(data.includes('item') ){
                var itemIndex = JSON.parse(localStorage.getItem(data)).folder
                var currentFolder = this.state.currentFolder
                if(itemIndex === currentFolder){
                    items.push(JSON.parse(localStorage.getItem(data)))
                }
            }
        }

        var sortedItems = items.sort((a, b) => parseInt(a.id.replace(/\D/g ,'')) - parseInt(b.id.replace(/\D/g ,'')))
        
        return sortedItems.map(itemDet => {
            if(itemDet !== null){
                return (
                    <div key={itemDet.id} className="quick-item-container">
                        <a onClick={this.setTransition} href={itemDet.url} data-id={itemDet.id} style={{backgroundColor: itemDet.color}} className="quick-item">
                            <div className="item-let">
                                <span className="let-ind">{itemDet.name.substr(0,1).toUpperCase()}</span>
                            </div>
                            <span className="item-name">{itemDet.name}</span>
                        </a>
                        <img onClick={this.showEditModal} data-id="item" className="item-option-btn" src={OptionButton} alt=""/>
                    </div> 
                )
            }
            return null;
        })
    }

    setTransition = (e) => {
        var bg = document.querySelector('.transition-bg')
        if(!e.ctrlKey){
            bg.style.height = '100vh'
        }
    }

    setCurrentFolder = (folder) => {
        this.setState({
            ...this.state,
            currentFolder: folder,
        })
    }

    setLabel = () => {
        var folderId = this.state.currentFolder

        if(folderId === 'default'){
            return 'Main'
        }else{
            return JSON.parse(localStorage.getItem(folderId)).name
        }
    }

    initColumnNo = () => {
        var maxColumns = Math.floor(window.innerWidth / 245);
        
        if(Cookies.get('noOfColumns') > maxColumns){
            return maxColumns
        }else{
            return Cookies.get('noOfColumns')
        }
    }

    getFolders = () => {
        var items = []

        for(var data in localStorage){
            if(data.includes('folder')){
                if(localStorage.getItem(data) && JSON.parse(localStorage.getItem(data)).name){
                    items.push(JSON.parse(localStorage.getItem(data)))
                }
            }
        }

        return items
    }

    getLastItems = () => {
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

        if(items.length < 1){
            return 0
        }else{
            return Math.max.apply(Math, highestValues)
        }
    }

    updateLinksState = () => {
        var items = []

        for(var data in localStorage){
            if(localStorage.getItem(data) !== null){
                items.push(p(localStorage.getItem(data)))
            }
        }

        this.setState({
            items: items
        })
    }

    showNewModal = () => document.querySelector(".new-item-modal").classList.toggle('modal-active')

    showEditModal = (e) => {
        var modal = document.querySelector(".edit-item-modal")
        var selectedItem = JSON.parse(localStorage.getItem(e.target.previousSibling.dataset.id))
        var nameInput = document.querySelector(".edit-name-input")
        var urlInput = document.querySelector(".edit-url-input")
        var colorInput = document.querySelector(".edit-colors-input")

        this.setState({
            selectedData: selectedItem
        })

        modal.classList.add('modal-active')
        nameInput.value = selectedItem.name
        urlInput.value = selectedItem.url
        colorInput.value = selectedItem.color
    }

    closeModal = (e) => {
        var newModal = document.querySelector(".new-item-modal")
        var editModal = document.querySelector(".edit-item-modal")
        var elements = document.getElementsByClassName('color-option')
        var picker = document.querySelector('.sketch-picker')
        var pickerNew = document.querySelector('.new-sketch')

        if(e.target === newModal || e.target === editModal){
            var inputs = document.querySelectorAll(".input")

            inputs.forEach(e => { e.value = '' });

            for(var i = 0; i < elements.length; i++){
                elements[i].className = 'color-option'
            }

            document.querySelector(".edit-item-modal").classList.remove('modal-active')
            document.querySelector(".new-item-modal").classList.remove('modal-active')
            
            picker.style.display = 'none'
            pickerNew.style.display = 'none'
        }
    }
}

export default QuickLinks;