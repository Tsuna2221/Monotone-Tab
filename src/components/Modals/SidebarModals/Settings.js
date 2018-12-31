import React, { Component } from 'react';
import Cookies from 'js-cookie'

class SettingsModal extends Component {
    render() {
        return (
            <div id='SettingsModal'>
                <div className="settings-container side-modal">
                    <div className="setting-columns">
                        <label>Nº of Columns</label>
                        {this.columnInput()}
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        var range = document.querySelector(".column-range")

        range.value = Cookies.get('noOfColumns')
    }

    columnInput = () => {
        var maxRange = Math.floor(window.innerWidth / 245)
        
        return <input onChange={this.handleRange} type="range" min="1" max={maxRange} name="column-range" className="column-range"/>
    }

    handleRange = (e) => {
        var container = document.querySelector(".quick-container")

        Cookies.set('noOfColumns', e.target.value)

        this.props.updateState()
        container.style.gridTemplateColumns = "repeat("+ e.target.value +", 245px)"
    }
}

export default SettingsModal;