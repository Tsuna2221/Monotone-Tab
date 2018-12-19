import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class QuickLinkEdit extends Component {
    render() {
        return (
            <div className="edit-item-modal">
                <div className="new-item-modal-content">
                    <div className="modal-container">
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="name">Name</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemName" className="input-name edit-name-input" type="text"/>
                                <span className="input-underline"></span>
                            </div>
                        </div>
                        
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="url">URL</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemURL" className="input-url edit-url-input" type="text"/>
                                <span className="input-underline"></span>
                            </div>
                        </div>

                        <div className="modal-colors">
                            <label className="modal-label" htmlFor="colors">Color</label>

                            <div className="color-field">
                                {this.modalColors()}
                            </div>
                        </div>
                        <div className="setting-buttons">
                            <div onClick={this.removeItem} className="modal-btn remove-btn">Remove Link</div>
                            <div onClick={this.handleItem} className="modal-btn confirm-btn">Edit Link</div>
                        </div>
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

    handleModalColor = (e) => {
        var hex = e.target.dataset.color

        this.setState({
            newItemColor: hex
        })

        this.markSelectedColor(e)
    }

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
        var color;

        if(this.state.colorSelected === ''){
            color = this.props.data.color
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

        //Update State
        this.props.updateLinksState()

        // eslint-disable-next-line
        window.localStorage.setItem(this.props.data.id, '{ "name":'+ '"' + nameInput + '"' +', "url":'+ '"' + urlInput + '"' +', "color":'+ '"' + color + '"' +', "id": ' + '"' + this.props.data.id + '"' +'}')
    }

    removeItem = () => {
        var modal = document.querySelector(".edit-item-modal")
        
        window.localStorage.removeItem(this.props.data.id)

        this.props.updateLinksState()

        modal.style.display = 'none'
    }
}

export default QuickLinkEdit;