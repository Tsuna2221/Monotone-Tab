import React, { Component } from 'react';

//Components
import NewFolder from './Modals/NewFolderModal'

//Images
import Arrow from '../assets/CollapseArrow.svg'

class Folders extends Component {
    render() {
        return (
            <div className="app-folders">
                <NewFolder/>
                <div className="sec-folders">
                    <span className="quick-label head-w">Folders</span>     
                    <div className="folder-main-container">
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

                <div onClick={this.collapseFolders} className="expand-div"><img className="collapse-arrow" src={Arrow} alt=""/></div>
            </div>
        );
    }

    state = {

    }

    drawFolders = () => {
        var items = [];

        for(var data in localStorage){
            if(data.includes('folder')){
                if(localStorage.getItem(data) && JSON.parse(localStorage.getItem(data)).name){
                    items.push(JSON.parse(localStorage.getItem(data)))
                }
            }
        }

        var sortedFolders = items.sort((a, b) => parseInt(a.id.replace(/\D/g ,'')) - parseInt(b.id.replace(/\D/g ,'')))

        return sortedFolders.map(itemDet => {
            var { name, color, id } = itemDet
            return (
                <div key={id} className="folder-container">
                    <div data-id={id} style={{backgroundColor: color}} className="folder-item">
                        <div className="folder-let">
                            <span className="folder-let-ind">{name.substr(0,1).toUpperCase()}</span>
                        </div>

                        <span className="folder-name">{name}</span>
                    </div>
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
}

export default Folders;