import React, { Component } from 'react';

import { returnTheme } from "../../../../actions/storageActions"

class ComponentName extends Component {
    render() {
        return (
            <div className="section">
                <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Theme</h1>
                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Theme</label>
                    
                    <div className="remove-btns flex-w">
                        <select onChange={this.setTheme} className="select-w">
                            <option name='light' value="light">Light (Shadow Blue)</option>
                            <option name='light2' value="light2">Light (Bright Purple)</option>
                            <option name='dark' value="dark">Dark (Brilliant Violet)</option>
                            <option name='dark2' value="dark2">Dark (Cobalt Blue)</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount = () => localStorage.getItem('theme') ? document.getElementsByName(localStorage.getItem('theme'))[0].setAttribute('selected', '1') : null

    setTheme = (e) => {
        localStorage.setItem('theme', e.target.value)

        window.location.reload()
    }
}

export default ComponentName;