import React, { Component } from 'react';

//Actions
import { exportBackup, importBackup } from '../../../actions/fbQuery'

import Prompt from './Prompt'
import Cookies from 'js-cookie'

class SettingsModal extends Component {
    render() {
        return (
            <div className='Settings Settings-Inactive modal-g'>
                <Prompt promptText={this.state.promptText}/>

                <div className="settings-container">
                    <div className="modal-w">
                        <h1 className="head-w">Settings</h1>
                        <div className="links-settings">
                            <h2 className="section-w">Quick Links</h2>

                            <div className="field-w">
                                <label className="label-w">Columns</label>
                                <div className="range-w">
                                    {this.columnInput()}
                                </div>
                            </div>

                            <div className="field-w">
                                <label className="label-w">Remove Items</label>
                                
                                <div className="remove-btns flex-w">
                                    <div data-type='selective' onClick={this.togglePrompt} className="button-w">Selective</div>
                                    <div data-type='remove-all' onClick={this.togglePrompt} className="button-w">Remove All</div>
                                </div>
                            </div>

                            <div className="field-w">
                                <label className="label-w">Backup Folders and Links</label>
                                
                                <div className="remove-btns flex-w">
                                    <div data-type='backup' onClick={this.togglePrompt} className="button-w">Export</div>
                                    <div data-type='restore' onClick={this.togglePrompt} className="button-w">Import</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
        promptText:{
            head: 'head',
            label: 'label',
            options: {
                num1: 'num1',
                num2: 'num2'
            }
        }
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

    columnInput = () => <input onChange={this.handleRange} type="range" min="1" max={Math.floor(window.innerWidth / 245)} name="column-range" className="column-range"/>
    
    handleRange = (e) => {
        var container = document.querySelector(".quick-container")

        Cookies.set('noOfColumns', e.target.value)

        this.props.updateState()
        container.style.gridTemplateColumns = "repeat("+ e.target.value +", 245px)"
    }

    togglePrompt = (e) => {
        if(document.querySelector('.app-prompt-inactive')){
            var prompt = document.querySelector('.app-prompt')
            var type = e.target.dataset.type
    
            var setText = (head, label, num1, num2, fnc1, fnc2) => {
                this.setState({
                    promptText:{
                        head: head,
                        label: label,
                        fnc1: fnc1,
                        fnc2: fnc2,
                        options: {
                            num1: num1,
                            num2: num2
                        }
                    }
                })
            }
    
            switch(type){
                case 'remove-all':
                    setText('Remove All', 'Are you sure?', 'No', 'Yes', null, () => {
                        localStorage.clear();
                        this.props.updateState()
                    })
                break;
    
                case 'selective':
                    setText('Selective Removal', 'Finish removal?', 'Finish', null, null, null)
                break;

                case 'backup':
                    setText('Export Folders and Items', 'Are you sure?', 'No', 'Yes', null, () => exportBackup(localStorage))
                break;
    
                case 'restore':
                    setText('Import Folders and Items', 'Are you sure?', 'No', 'Yes', null, () => {                     
                        importBackup(this.props.updateState)
                    })
                break;

                default:
                    return null
            }
    
            prompt.classList.toggle('app-prompt-inactive')
        }
    }
}

export default SettingsModal;