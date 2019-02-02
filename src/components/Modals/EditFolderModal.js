import React, { Component } from 'react';

import { SketchPicker } from 'react-color';

import { validateFolder } from '../../actions/formValidator'
import { returnTheme } from "../../actions/storageActions"

class EditFolder extends Component {
    render() {
        return (
            <div onClick={this.closeModal} className="modal-edit-folder">
                <div className={"edit-folder-modal "+ returnTheme() + "-t-modal"}>
                    <div className="edit-folder-modal-content">
                        <div className="modal-w">
                            {this.modalColors()}
                            <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Edit Folder</h1>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="name">Name</label>
                                <div className="input-w">
                                    <input onChange={this.handleInput} autoComplete="off" name="name" className="edit-folder-name input" placeholder="Example" type="text"/>
                                </div>
                            </div>                   

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="colors">Color</label>

                                <div className="input-w">
                                    <input onFocus={this.showColors} onChange={this.handleInput} autoComplete="off" name="color" className="edit-folder-color input" placeholder="#E32018" type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="btn-container-w">
                            <div onClick={this.removeFolder} className={"btn-w "+ returnTheme() + "-t-btn-w"}>Remove Folder</div>
                            <div onClick={this.editFolder} className={"btn-w "+ returnTheme() + "-t-btn-w"}>Edit Folder</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    toggleModal = () => document.querySelector('.modal-edit-folder').classList.toggle('modal-active')

    closeModal = (e) => {
        if(e.target === document.querySelector('.modal-edit-folder')){
            document.querySelector('.modal-edit-folder').classList.toggle('modal-active')
            document.querySelector('.folder-edit-sketch').style.display = 'none'
        }
    }

    modalColors = () => <SketchPicker className={returnTheme() + '-t-modal folder-edit-sketch'} onChangeComplete = { this.handleColor }/>

    handleColor = (color) => document.querySelector(".edit-folder-color").value = color.hex

    showColors = () => { document.querySelector('.folder-edit-sketch').style.display = 'block' }

    editFolder = () => {
        var nameInput = document.querySelector(".edit-folder-name").value
        var colorInput = document.querySelector(".edit-folder-color").value
        var id = this.props.folderId

        if(validateFolder(nameInput, colorInput)){
            var obj = {
                name: nameInput,
                color: colorInput,
                id: id
            }

            localStorage.setItem(id, JSON.stringify(obj))
            this.toggleModal()
        }
        
        document.querySelector('.folder-edit-sketch').style.display = 'none'
        this.props.updateState()
    }

    removeFolder = () => {
        this.props.setCurrentFolder('default')
        var id = this.props.folderId
        var folderItems = []

        localStorage.removeItem(id)  

        for(var data in localStorage){
            if(data.includes('item')){
                folderItems.push(JSON.parse(localStorage.getItem(data)))
                folderItems.forEach(item => {
                    if(item.folder === id){
                        localStorage.removeItem(item.id)
                    }
                })
            }
        }

        this.toggleModal()
        this.props.updateState()
    }
}

export default EditFolder;