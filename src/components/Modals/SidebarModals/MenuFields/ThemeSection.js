import React, { Component } from 'react';
import { CompactPicker } from 'react-color';

import { returnTheme } from "../../../../actions/storageActions"
import { setCustomTheme } from "../../../../actions/general"

class ComponentName extends Component {
    render() {
        return (
            <div className="section">
                <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Theme</h1>
                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Theme</label>
                    
                    <div className="remove-btns flex-w">
                        <select onChange={this.setTheme} className="select-w">
                            <option name='light' value="light">Light</option>
                            <option name='dark' value="dark">Dark</option>
                            <option name='custom' value="custom">Custom</option>
                        </select>
                    </div>
                </div>

                {this.drawIfCustomTheme()}
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => localStorage.getItem('theme') ? document.getElementsByName(localStorage.getItem('theme'))[0].setAttribute('selected', '1') : null

    setTheme = (e) => {
        localStorage.setItem('theme', e.target.value)

        window.location.reload()
    }

    drawIfCustomTheme = () => {
        if(localStorage.getItem('theme') === 'custom'){
            var fields = [
                {
                    name: 'Text',
                    stateName: 't-text'
                },
                {
                    name: 'Background',
                    stateName: 't-background'
                },
                {
                    name: 'Header',
                    stateName: 't-header'
                },
                {
                    name: 'Modal Button',
                    stateName: 't-modal-button'
                },
                {
                    name: 'General Button',
                    stateName: 't-general-button'
                },
                {
                    name: 'Modal',
                    stateName: 't-modal'
                }
            ]

            return fields.map(field => {
                var {name, stateName} = field
                return (
                    <div key={name} className="field-w">
                        <label className={"label-w "+ returnTheme() + "-t-text-w"}>{name} Color</label>
                        <div className="remove-btns flex-w">
                            <CompactPicker onChange={() => this.setState({stateName: stateName})} onChangeComplete= {this.handleColor}/>
                        </div>
                        <div className="remove-btns flex-w">
                            <div onClick={() => this.resetColor(stateName)} className={"button-w "+ returnTheme() + "-t-button-w"}>Reset Color</div>
                        </div>
                    </div>
                )
            })
        }
    }

    handleColor = (color) => {
        var state = this.state.stateName
        setCustomTheme()
        localStorage.setItem(state, color.hex)
    }

    resetColor = (state) => {
        localStorage.setItem(state, null)
        setCustomTheme()
    }
}

export default ComponentName;