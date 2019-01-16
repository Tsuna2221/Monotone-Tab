import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { validateFolder } from '../../actions/formValidator'
import { returnLastFolder, returnTheme } from '../../actions/storageActions'

class NewFolder extends Component {
    render() {
        return (
            <div onClick={this.closeModal} className="modal-new-folder">
                <div className={"new-folder-modal "+ returnTheme() + "-t-modal"}>
                    <div className="new-folder-modal-content">
                        <div className="modal-w">
                            {this.modalColors()}
                            <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Add Folder</h1>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="name">Name</label>
                                <div className="input-w">
                                    <input onChange={this.handleInput} autoComplete="off" name="name" className="new-folder-name input" placeholder="Example" type="text"/>
                                </div>
                            </div>                   

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="colors">Color</label>

                                <div className="input-w">
                                    <input onFocus={this.showColors} onChange={this.handleInput} autoComplete="off" name="color" className="new-folder-color input" placeholder="#E32018" type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className=".btn-container-w">
                            <div onClick={this.addFolder} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>Add Folder</div>
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

    modalColors = () => <SketchPicker color={this.state.folderColor} onChangeComplete = { this.handleColor }/>

    toggleModal = () => document.querySelector('.modal-new-folder').classList.toggle('modal-active')

    closeModal = (e) => {
        if(e.target === document.querySelector('.modal-new-folder')){
            document.querySelector('.modal-new-folder').classList.toggle('modal-active')
            document.querySelector('.folder-new-sketch').style.display = 'none'
        }
    }

    modalColors = () => <SketchPicker className='folder-new-sketch' color='#fff' onChangeComplete = { this.handleColor }/>

    handleColor = (color) => {document.querySelector(".new-folder-color").value = color.hex; this.setState({color: color.hex})}

    showColors = () => { document.querySelector('.folder-new-sketch').style.display = 'block';  }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    getLastItems = () => returnLastFolder() < 1 ? 0 : Math.max.apply(Math, returnLastFolder())

    addFolder = () => {
        var {name, color} = this.state

        if(validateFolder(name, color)){
            var obj = {
                name: name,
                color: color,
                id: 'folder' + (this.getLastItems() + 1)
            }

            localStorage.setItem('folder' + (this.getLastItems() + 1), JSON.stringify(obj))
            this.toggleModal()
        }
        
        document.querySelector('.folder-new-sketch').style.display = 'none'
        this.props.updateState()
    }
}

export default NewFolder;