import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class QuickLinkEdit extends Component {
    render() {
        return (
            <div className="edit-item-modal">
                <div className="new-item-modal-content">
                    <div className="modal-container">
                        {this.modalColors()}
                        <h1 className="modal-set">Edit Quick Link</h1>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="name">Name</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemName" className="input-name edit-name-input" placeholder="Example" type="text"/>
                            </div>
                        </div>
                        
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="url">URL</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemURL" className="input-url edit-url-input" placeholder="http://www.example.com" type="text"/>
                            </div>
                        </div>

                        <div className="modal-field">
                            <label className="modal-label" htmlFor="colors">Color</label>

                            <div className="input-field">
                                <input onFocus={this.showColors} onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemURL" className="input-colors edit-colors-input" placeholder="#E32018" value={this.state.color} type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="setting-buttons">
                        {/*modal-btn remove-btn, modal-btn confirm-btn*/}
                        <div onClick={this.removeItem} className="modal-button">Remove Link</div>
                        <div onClick={this.handleItem} className="modal-button">Edit Link</div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
    
    }

    modalColors = () => {
        var items = [];

        for(var data in localStorage){
            if(localStorage.getItem(data)){
                items.push(JSON.parse(localStorage.getItem(data)).color)
            }
        }

        return <SketchPicker presetColors={items} color={this.state.colorSelected} onChangeComplete = { this.handleColor }/>
    }

    handleColor = (color) => this.setState({colorSelected: color.hex})

    handleModalInput = (e) => {
        var key = e.target.name
        var val = e.target.value

        this.setState({
            [key]: val
        })
    }

    showColors = () => { document.querySelector('.sketch-picker').style.display = 'block' }

    markSelectedColor = (e) =>{
        var selected = e.target
        var elements = document.getElementsByClassName('color-option')

        for(var i = 0; i < elements.length; i++){
            elements[i].className = 'color-option'
        }

        selected.classList.toggle('color-selected')
    }

    handleItem = () => {
        var nameInput = document.querySelector(".edit-name-input").value
        var urlInput = document.querySelector(".edit-url-input").value
        var elements = document.getElementsByClassName('color-option')
        var modal = document.querySelector(".edit-item-modal")
        var picker = document.querySelector('.sketch-picker')
        var colorInput = document.querySelector(".edit-colors-input")
        var color;

        if(this.state.colorSelected === ''){
            color = colorInput.value
        }else{
            color = this.state.colorSelected
        }

        //Reset selected color border
        for(var i = 0; i < elements.length; i++){
            elements[i].className = 'color-option'
        }

        //Parse http
        if(!urlInput.includes('http')){
            urlInput = 'http://' + urlInput
        }

        //Hide modal
        modal.style.display = 'none'
        picker.style.display = 'none'

        //Update State
        this.props.updateLinksState()

        this.setState({
            ...this.state,
            colorSelected: ''
        })

        // eslint-disable-next-line
        window.localStorage.setItem(this.props.data.id, '{ "name":'+ '"' + nameInput + '"' +', "url":'+ '"' + urlInput + '"' +', "color":'+ '"' + color + '"' +', "id": ' + '"' + this.props.data.id + '"' +'}')
    }

    removeItem = () => {
        var modal = document.querySelector(".edit-item-modal")
        var picker = document.querySelector('.sketch-picker')
        
        window.localStorage.removeItem(this.props.data.id)

        this.props.updateLinksState()

        modal.style.display = 'none'
        picker.style.display = 'none'
    }
}

export default QuickLinkEdit;