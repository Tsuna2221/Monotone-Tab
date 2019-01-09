import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { validateFolder } from '../../actions/formValidator'

class NewFolder extends Component {
    render() {
        return (
            <div onClick={this.closeModal} className="modal-new-folder">
                <div className="new-folder-modal">
                    <div className="new-folder-modal-content">
                        <div className="modal-w">
                            {this.modalColors()}
                            <h1 className="head-w">Add Folder</h1>

                            <div className="field-w">
                                <label className="label-w" htmlFor="name">Name</label>
                                <div className="input-w">
                                    <input onChange={this.handleInput} autoComplete="off" name="name" className="input-name input" placeholder="Example" type="text"/>
                                </div>
                            </div>                   

                            <div className="field-w">
                                <label className="label-w" htmlFor="colors">Color</label>

                                <div className="input-w">
                                    <input onFocus={this.showColors} onChange={this.handleInput} autoComplete="off" name="color" className="input-color input" placeholder="#E32018" type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className=".btn-container-w">
                            <div onClick={this.addFolder} className="btn-w f-w">Add Folder</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
        name: '',
        color: ''
    }

    modalColors = () => {
        return <SketchPicker color={this.state.folderColor} onChangeComplete = { this.handleColor }/>
    }

    toggleModal = () => document.querySelector('.modal-new-folder').classList.toggle('modal-active')

    closeModal = (e) => {
        var modal = document.querySelector('.modal-new-folder')
        if(e.target === modal){
            modal.classList.toggle('modal-active')
        }
    }

    handleInput = (e) => {
        var key = e.target.name;
        var value = e.target.value;

        this.setState({
            [key]: value,
        })
    }

    getLastItems = () => {
        var items = []
        for(var data in localStorage){
            if(data.includes('folder')){
                if(localStorage.getItem(data) !== null){
                    items.push(parseInt(data.replace('folder', '')))
                }
            }
        }
        if(items.length < 1){
            return 0
        }else{
            return Math.max.apply(Math, items)
        }
    }

    addFolder = () => {
        var {name, color} = this.state

        if(validateFolder(name, color)){
            localStorage.setItem('folder' + (this.getLastItems() + 1), '{"name": "'+ name +'", "color": "'+ color +'", "id": "folder'+ (this.getLastItems() + 1) +'"}')
            this.toggleModal()
        }
    }
}

export default NewFolder;