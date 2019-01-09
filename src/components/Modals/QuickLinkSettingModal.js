import React, { Component } from 'react';
import { validateLinks } from '../../actions/formValidator'
import { SketchPicker } from 'react-color';

class QuickLinkModal extends Component {
    render() {
        return (
            <div className="new-item-modal">
                <div className="new-item-modal-content">
                    <div className="modal-w">
                        {this.modalColors()}
                        <h1 className="head-w">Add Quick Link</h1>

                        <div className="field-w">
                            <label className="label-w" htmlFor="name">Name</label>
                            <div className="input-w">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemName" className="input-name input" placeholder="Example" type="text"/>
                            </div>
                        </div>
                        
                        <div className="field-w">
                            <label className="label-w" htmlFor="url">URL</label>
                            <div className="input-w">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemURL" className="input-url input" placeholder="http://www.example.com" type="text"/>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className="label-w" htmlFor="folder">Folder</label>
                            <div className="input-w">
                                <select onChange={this.handleModalInput} name="newItemFolder" className="input-folder select-w">
                                    <option value='default'>Default</option>
                                    {this.drawFolderOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className="label-w" htmlFor="colors">Color</label>

                            <div className="input-w">
                                <input onFocus={this.showColors} onChange={this.handleModalInput} autoComplete="off" name="newItemColor" className="input-color input" placeholder="#E32018" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className=".btn-container-w">
                        <div onClick={this.handleItem} className="btn-w f-w">Add Link</div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
        colorSelected:'',
        folders: [],
        newItemFolder: 'default'
    }

    drawFolderOptions = () => {
        return this.props.folders().map(folder => {
            var { name, id } = folder
            return (
                <option key={id} value={id}>{name}</option>
            )
        })
    }

    modalColors = () => <SketchPicker className="new-sketch" presetColors={['fff']} color={this.state.newItemColor} onChangeComplete={ this.handleColor }/>

    handleColor = (color) => {
        document.querySelector('.input-color').value = color.hex

        this.setState({newItemColor: color.hex})
    }

    handleModalInput = (e) => {
        var key = e.target.name
        var val = e.target.value
        
        this.setState({
            [key]: val
        })
    }

    handleModalColor = (e) => {
        var hex = e.target.dataset.color

        this.setState({
            newItemColor: hex
        })

        this.markSelectedColor(e)
    }

    showColors = () => { document.querySelector('.new-sketch').style.display = 'block' }

    handleItem = () => {
        var { newItemName, newItemURL, newItemFolder, newItemColor } = this.state
        var modal = document.querySelector(".new-item-modal")
        var lastNumberInt = this.props.lastItem
        var picker = document.querySelector('.new-sketch')
        var colorInput = document.querySelector(".input-color")
        var color = colorInput.value;

        if(validateLinks(newItemName, newItemURL, newItemColor) === true){
            //URL "parser"
            if(!newItemURL.includes('http')){
                newItemURL = 'http://' + newItemURL
            }

            //Update State
            this.props.updateLinksState()

            // eslint-disable-next-line
            window.localStorage.setItem('item' + (lastNumberInt + 1), '{ "name":'+ '"' + newItemName + '"' +', "url":'+ '"' + newItemURL + '"' +', "folder": "'+ newItemFolder +'", "color":'+ '"' + color + '"' +', "id": "item' + (lastNumberInt + 1) + '"' +'}')

            //Hide modal
            modal.classList.toggle('modal-active')
            picker.style.display = 'none'
        }
    }
}

export default QuickLinkModal;