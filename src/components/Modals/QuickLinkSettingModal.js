import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class QuickLinkModal extends Component {
    render() {
        return (
            <div className="new-item-modal">
                <div className="new-item-modal-content">
                    <div className="modal-container">
                        {this.modalColors()}
                        <h1 className="modal-set">Add Quick Link</h1>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="name">Name</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemName" className="input-name input" placeholder="Example" type="text"/>
                            </div>
                        </div>
                        
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="url">URL</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemURL" className="input-url input" placeholder="http://www.example.com" type="text"/>
                            </div>
                        </div>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="colors">Color</label>

                            <div className="input-field">
                                <input onFocus={this.showColors} onChange={this.handleModalInput} autoComplete="off" name="newItemColor" className="input-color input" placeholder="#E32018" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="setting-buttons">
                        <div onClick={this.handleItem} className="modal-button f-w">Add Link</div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
        colorSelected:'',
    }

    modalColors = () => {
        var colorInput = document.querySelector('.input-color') || '#fff'

        return <SketchPicker className="new-sketch" presetColors={['fff']} color={colorInput} onChangeComplete={ this.handleColor }/>
    }

    handleColor = (color) => document.querySelector('.input-color').value = color.hex

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
        var url = this.state.newItemURL;
        var elements = document.getElementsByClassName('color-option')
        var inputName = document.querySelector(".input-name")
        var inputURL = document.querySelector(".input-url")
        var modal = document.querySelector(".new-item-modal")
        var lastNumberInt = this.props.lastItem
        var picker = document.querySelector('.new-sketch')
        var colorInput = document.querySelector(".input-color")
        var color = colorInput.value;

        //URL "parser"
        if(!url.includes('http')){
            url = 'http://' + url
        }

        //Unmark Color of offclick
        for(var i = 0; i < elements.length; i++){
            elements[i].className = 'color-option'
        }

        //Update State
        this.props.updateLinksState()

        // eslint-disable-next-line
        window.localStorage.setItem('item' + (lastNumberInt + 1), '{ "name":'+ '"' + this.state.newItemName + '"' +', "url":'+ '"' + url + '"' +', "color":'+ '"' + color + '"' +', "id": "item' + (lastNumberInt + 1) + '"' +'}')

        //Clear Input Fields
        inputName.value = ''
        inputURL.value = ''

        //Hide modal
        modal.style.display = 'none'
        picker.style.display = 'none'
    }
}

export default QuickLinkModal;