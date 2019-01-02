import React, { Component } from 'react';
import Cookies from 'js-cookie'

class SettingsModal extends Component {
    render() {
        return (
            <div className='Settings Settings-Inactive modal-g'>
                <div className="settings-container">
                    <div className="modal-w">
                        <h1 className="head-w">Settings</h1>

                        <div className="field-w">
                            <label className="label-w">Columns</label>
                            <div className="range-w">
                                {this.columnInput()}
                            </div>
                        </div>
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

        document.addEventListener("click", function(event) {
            var prefix = 'Settings-Inactive'
            var element = document.querySelector('.Settings')
            var inactive = document.querySelector('.Settings-Inactive')
            var button = document.querySelector('.settings-icon')

            if (!inactive && event.target !== button && !event.target.closest(".Settings")){
                if(element){
                    element.classList.toggle(prefix)
                }
            };
        });
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