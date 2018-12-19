import React, { Component } from 'react';
import p from 'parse-string-data'
import Cookies from 'js-cookie'

//Components
import QuickLinkModal from './Modals/QuickLinkSettingModal'
import QuickLinkEdit from './Modals/QuickLinkEditModal'

//Images
import OptionButton from "../assets/OptionButton.svg";


class QuickLinks extends Component {
    render() {
        window.onclick = this.closeModal
        return (
            <div id='QuickLinks'>
                <QuickLinkEdit data={this.state.selectedData} lastItem={this.getLastItems()} updateLinksState={this.updateLinksState} linkColors={this.state.linkColors}/>
                <QuickLinkModal lastItem={this.getLastItems()} updateLinksState={this.updateLinksState} linkColors={this.state.linkColors}/>

                <div id="quick-main-container">
                    <span className="quick-label">Quick Links</span>

                    <div className="quick-container" style={{ gridTemplateColumns: 'repeat( '+ this.initColumnNo() +', 245px )' }}>
                        {this.drawContainer()}
                        <div className="quick-item-container">
                            <div data-id="new-item" onClick={this.showNewModal} className="quick-item empty-item">
                                <div className="item-let empty-let">
                                    <span className="let-ind">+</span>
                                </div>

                                <span className="item-name empty-name">Add New</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {}

    componentDidMount = () => {
        if(Cookies.get('isFirstStart') !== false){
            Cookies.set('noOfColumns', 4)
        }
    }

    drawContainer = () => {
        var items = [];
        var sortedItems;

        for(var data in localStorage){
            if(localStorage.getItem(data) && JSON.parse(localStorage.getItem(data)).name){
                items.push(JSON.parse(localStorage.getItem(data)))
            }
        }

        sortedItems = items.sort(function(a, b){ return a.id - b.id })
        
        return sortedItems.map(itemDet => {
            if(itemDet !== null){
                return (
                    <div key={itemDet.id} className="quick-item-container">
                        <div data-id={itemDet.id} onClick={() => {this.redirectTo(itemDet.url);}} style={{backgroundColor: itemDet.color}} className="quick-item">
                            <div className="item-let">
                                <span className="let-ind">{itemDet.name.substr(0,1).toUpperCase()}</span>
                            </div>
                            <span className="item-name">{itemDet.name}</span>
                        </div>
                        <img onClick={this.showEditModal} data-id="item" className="item-option-btn" src={OptionButton} alt=""/>
                    </div>
                    
                )
            }
            return null;
        })
    }

    initColumnNo = () => {
        var maxColumns = Math.floor(window.innerWidth / 245);
        
        if(Cookies.get('noOfColumns') > maxColumns){
            return maxColumns
        }else{
            return Cookies.get('noOfColumns')
        }
    }

    getLastItems = () => {
        var items = [];
        var highestValues = [];

        for(var data in localStorage){
            if(localStorage.getItem(data) !== null){
                items.push(JSON.parse(localStorage.getItem(data)))
                highestValues.push(parseInt(data.replace('item', '')))
            }
        }

        if(localStorage.length < 1){
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

    redirectTo = (url) => window.location.href = url

    showNewModal = () => document.querySelector(".new-item-modal").style.display = "flex"

    showEditModal = (e) => {
        var modal = document.querySelector(".edit-item-modal")
        var selectedItem = JSON.parse(localStorage.getItem(e.target.previousSibling.dataset.id))
        var nameInput = document.querySelector(".edit-name-input")
        var urlInput = document.querySelector(".edit-url-input")

        this.setState({
            selectedData: selectedItem
        })

        modal.style.display = "flex"
        nameInput.value = selectedItem.name
        urlInput.value = selectedItem.url
    }

    closeModal = (e) => {
        var newModal = document.querySelector(".new-item-modal")
        var editModal = document.querySelector(".edit-item-modal")
        var elements = document.getElementsByClassName('color-option')

        if(e.target === newModal || e.target === editModal){
            var inputs = document.querySelectorAll(".input")

            inputs.forEach(e => { e.value = '' });

            for(var i = 0; i < elements.length; i++){
                elements[i].className = 'color-option'
            }

            editModal.style.display = 'none'
            newModal.style.display = 'none'
        }
    }
}

export default QuickLinks;