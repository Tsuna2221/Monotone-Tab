import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class QuickLinkModal extends Component {
    render() {
        return (
            <div className="new-item-modal">
                <div className="new-item-modal-content">
                    <div className="modal-container">
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="name">Name</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemName" className="input-name input" type="text"/>
                                <span className="input-underline"></span>
                            </div>
                        </div>
                        
                        <div className="modal-field">
                            <label className="modal-label" htmlFor="url">URL</label>
                            <div className="input-field">
                                <input onChange={this.handleModalInput} autoComplete="off" name="newItemURL" className="input-url input" type="text"/>
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
                            <div onClick={this.handleItem} className="modal-btn confirm-btn">Add Link</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
        colorSelected:'',
        items: [],
        color: ''
    }

    modalColors = () => {
        return <SketchPicker color={this.state.colorSelected} onChangeComplete={ this.handleColor }/>
        /*return this.props.linkColors.map((col) => (
                <div key={col.hex} onClick={this.handleModalColor} className={'color-option' + this.state.colorSelected} style={{backgroundColor: col.hex}} data-color={col.hex}></div>
            )
        )*/
    }

    handleColor = (color, event) => this.setState({colorSelected: color.hex})

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
        //Define URL if passed data through editing or not
        var url = this.state.newItemURL;

        //Get Color List Elements
        var elements = document.getElementsByClassName('color-option')

        //Get Input Field Data
        var inputName = document.querySelector(".input-name")
        var inputURL = document.querySelector(".input-url")

        //Get Modal
        var modal = document.querySelector(".new-item-modal")

        //Last number integer
        var lastNumberInt = this.props.lastItem

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
        window.localStorage.setItem('item' + (lastNumberInt + 1), '{ "name":'+ '"' + this.state.newItemName + '"' +', "url":'+ '"' + url + '"' +', "color":'+ '"' + this.state.colorSelected + '"' +', "id": "item' + (lastNumberInt + 1) + '"' +'}')

        //Clear Input Fields
        inputName.value = ''
        inputURL.value = ''

        //Hide modal
        modal.style.display = 'none'
    }
}

export default QuickLinkModal;