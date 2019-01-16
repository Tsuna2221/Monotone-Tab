import React, { Component } from 'react';
import moment from "moment"
import firebase from '../../../config/fbConfig'
import Prompt from './Prompt'

//Images
import Theme from '../../../assets/ThemeButton.svg'

//Actions
import { returnTheme, setTheme } from '../../../actions/storageActions'
import { exportBackup, importBackup } from '../../../actions/fbQuery'
import { hideModal } from '../../../actions/general'



class SettingsModal extends Component {
    render() {
        return (
            <div className={'Settings Settings-Inactive '+ returnTheme() + '-t-modal'}>
                <Prompt promptText={this.state.promptText}/>

                <div className="settings-container">
                    <div className="modal-w">
                        <img onClick={this.applyTheme} className="theme-btn" src={Theme} alt=""/>
                        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Settings</h1>
                        <div className="links-settings">
                            <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Quick Links</h2>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"}>Columns</label>
                                <div className="range-w">
                                    {this.columnInput()}
                                </div>
                            </div>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"}>Remove Items</label>
                                
                                <div className="remove-btns flex-w">
                                    <div data-type='selective' onClick={this.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Selective</div>
                                    <div data-type='remove-all' onClick={this.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Remove All</div>
                                </div>
                            </div>
                            

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"}>Backup Folders and Links</label>
                                
                                {this.checkIfLogged()}
                            </div>
                            <hr className="side-separator"/>
                            <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Search Engine and Date</h2>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Search Engine</label>
                                
                                <div className="remove-btns flex-w">
                                    <select data-type='backup' onChange={(e) => this.props.setEngine(e.target.name, e.target.value)} name="engineTypo" className="select-w">
                                        <option name='google' value="google">Google</option>
                                        <option name='bing' value="bing">Bing</option>
                                        <option name='duck' value="duck">DuckDuckGo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="field-w">
                                <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Date Format</label>
                                
                                <div className="remove-btns flex-w">
                                    <select data-type='backup' onChange={(e) => this.props.setEngine(e.target.name, e.target.value)} name="formatTypo" className="select-w">
                                        {this.drawFormatOptions()}
                                    </select>
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
        range.value = localStorage.getItem('noOfColumns')
        
        if(localStorage.getItem('engineTypo') && localStorage.getItem('engineTypo')){
            document.getElementsByName(localStorage.getItem('engineTypo'))[0].setAttribute('selected', '1')
            document.getElementsByName(localStorage.getItem('formatTypo'))[0].setAttribute('selected', '1')
        }
        
        document.addEventListener("click", e => {
            var els = {
                prefix: 'Settings-Inactive',
                element: '.Settings',
                button: '.settings-icon',
            }

            hideModal(els, e)
        });
    }

    checkIfLogged = () => {
        if(firebase.auth().currentUser){
            return (
                <div className="remove-btns flex-w">
                    <div data-type='backup' onClick={this.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Export</div>
                    <div data-type='restore' onClick={this.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Import</div>
                </div>
            )
        }else{
            return (
                <div className="remove-btns flex-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Log in to backup your data</label>
                </div>
            )
        }
    }

    drawFormatOptions = () => {
        var prefix = ['MMMM Do YYYY, h:mm:ss a', 'hh:mm:ss  |  dddd, Do', 'LT', 'LTS', 'L', 'l', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll']

        return prefix.map(pre => {
            return (
                <option name={pre} key={pre} value={pre}>{moment().format(pre)}</option>
            )
        })
    }

    columnInput = () => <input onChange={this.handleRange} type="range" min="1" max={Math.floor(window.outerWidth / 245)} name="column-range" className="column-range"/>
    
    handleRange = (e) => {
        var container = document.querySelector(".quick-container")

        localStorage.setItem('noOfColumns', e.target.value)

        this.props.updateState()
        container.style.gridTemplateColumns = "repeat("+ e.target.value +", 245px)"
    }

    applyTheme = () => {returnTheme() === 'light' ? setTheme('dark') : setTheme('light'); window.location.reload()}

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
                        window.location.reload()
                        for(var item in localStorage){
                            if(item.includes('folder') || item.includes('item')){
                                localStorage.removeItem(item)
                            }
                        }
                        this.props.updateState()
                    })
                break;
    
                case 'selective':
                    this.props.setSelection(true)
                    setText('Selective Removal', 'Finish removal?', 'Finish', null, () => this.props.setSelection(false), null)
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