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
import Cross from "../assets/Cross.svg";

//Actions
import { returnLinks, returnLastLink } from "../actions/storageActions"


class QuickLinks extends Component {
    render() {
        window.onclick = this.closeModal
        return (
            <div id='QuickLinks'>
                <QuickLinkEdit folders={this.getFolders} data={this.state.selectedData} lastItem={this.getLastItems()} updateLinksState={this.updateLinksState} linkColors={this.state.linkColors}/>
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
        if(localStorage.getItem('isFirstStart') === null){
            localStorage.setItem('noOfColumns', 4)
        }
    }

    drawContainer = () => {
        var image = () => {
            if(!this.props.isSelecting){
                return <img onClick={this.showEditModal} data-id="item" className="item-option-btn" src={OptionButton} alt=""/>
            }else{
                return <img onClick={e => this.removeItem(e.target.previousSibling.dataset.id)} data-id="item" className="item-selection-btn" src={Cross} alt=""/>
            }
        }

        return returnLinks(this.state.currentFolder).map(itemDet => {
            if(itemDet !== null){
                return (
                    <div key={itemDet.id} className="quick-item-container">
                        <a onClick={this.setTransition} href={itemDet.url} data-id={itemDet.id} style={{backgroundColor: itemDet.color}} className="quick-item">
                            <div className="item-let">
                                <span className="let-ind">{itemDet.name.substr(0,1).toUpperCase()}</span>
                            </div>
                            <span className="item-name">{itemDet.name}</span>
                        </a>
                        {image()}
                    </div> 
                )
            }
            return null;
        })
    }

    setTransition = (e) => !e.ctrlKey ? document.querySelector('.transition-bg').style.height = '100vh' : null

    setCurrentFolder = (folder) => this.setState({...this.state, currentFolder: folder,})

    setLabel = () => this.state.currentFolder === 'default' ? 'Main' : JSON.parse(localStorage.getItem(this.state.currentFolder)).name

    initColumnNo = () => localStorage.getItem('noOfColumns') > Math.floor(window.outerWidth / 245) ? Math.floor(window.outerWidth / 245) : localStorage.getItem('noOfColumns')

    getLastItems = () => returnLastLink().items.length < 1 ? 0 : Math.max.apply(Math, returnLastLink().highestValues)

    removeItem = (id) => {window.localStorage.removeItem(id);this.updateLinksState()}

    updateLinksState = () => {
        var items = []

        for(var data in localStorage){
            if(localStorage.getItem(data) !== null){
                items.push(p(localStorage.getItem(data)))
            }
        }

        this.setState({items: items})
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
        var picker = document.querySelector('.sketch-picker')
        var pickerNew = document.querySelector('.new-sketch')

        if(e.target === newModal || e.target === editModal){
            var inputs = document.querySelectorAll(".input")

            inputs.forEach(e => { e.value = '' });

            document.querySelector(".edit-item-modal").classList.remove('modal-active')
            document.querySelector(".new-item-modal").classList.remove('modal-active')
            
            picker.style.display = 'none'
            pickerNew.style.display = 'none'
        }
    }
}

export default QuickLinks;