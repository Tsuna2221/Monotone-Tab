import React, { Component } from 'react';

//Components
import NewFolder from './Modals/NewFolderModal'
import EditFolder from './Modals/EditFolderModal'

//Images
import Arrow from '../assets/CollapseArrow.svg'
import OptionButton from "../assets/OptionButton.svg"

//Actions
import { returnFolders } from "../actions/storageActions"

class Folders extends Component {
    render() {
        return (
            <div className="app-folders">
                <NewFolder updateState={this.props.updateLinksState}/>
                <EditFolder updateState={this.props.updateLinksState} folderId={this.state.idToEdit}/>

                <div className="sec-folders sec-folders-disabled">
                    <span className="quick-label head-w">Folders</span>     
                    <div className="folder-main-container">
                        <div className="folder-container">
                            <div onClick={() => this.props.setCurrentFolder('default')} data-id="default" style={{backgroundColor: '#5f5f5f'}} className="folder-item">
                                <div className="folder-let">
                                    <span className="folder-let-ind">M</span>
                                </div>

                                <span className="folder-name">Main</span>
                            </div>
                        </div>

                        {this.drawFolders()}

                        <div className="folder-container">
                            <div data-id="new-folder" onClick={this.toggleModal} className="folder-item empty-folder">
                                <div className="folder-let folder-empty-let">
                                    <span className="folder-let-ind">+</span>
                                </div>

                                <span className="folder-name folder-empty-name">New Folder</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={this.collapseFolders} className="expand-div"><img className="collapse-arrow collapse-arrow-active" src={Arrow} alt=""/></div>
            </div>
        );
    }

    state = {

    }

    drawFolders = () => {
        return returnFolders().map(itemDet => {
            var { name, color, id } = itemDet
            
            return (
                <div key={id} className="folder-container">
                    <div onClick={() => this.props.setCurrentFolder(id)} data-id={id} style={{backgroundColor: color}} className="folder-item">
                        <div className="folder-let">
                            <span className="folder-let-ind">{name.substr(0,1).toUpperCase()}</span>
                        </div>

                        <span className="folder-name">{name}</span>
                    </div>
                    <img onClick={this.toggleEditModal} data-id={id} className="item-option-btn folder-option-btn" src={OptionButton} alt=""/>
                </div>
            )
        })
    }

    toggleModal = () => document.querySelector('.modal-new-folder').classList.toggle('modal-active')

    collapseFolders = () => {
        var folders = document.querySelector('.sec-folders')
        var arrow = document.querySelector('.collapse-arrow')
        
        folders.classList.toggle('sec-folders-disabled')
        arrow.classList.toggle('collapse-arrow-active')
    }

    toggleEditModal = (e) => {
        var modal = document.querySelector('.modal-edit-folder')
        var id = e.target.dataset.id
        var {name, color} = JSON.parse(localStorage.getItem(id))
        var inputName = document.querySelector('.edit-folder-name')
        var inputColor = document.querySelector('.edit-folder-color')
        
        this.setState({
            ...this.state,
            idToEdit: id
        })

        inputName.value = name
        inputColor.value = color

        modal.classList.toggle('modal-active')
    }
}

export default Folders;