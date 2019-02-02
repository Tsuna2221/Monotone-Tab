import React, { Component } from 'react';
import moment from "moment"
import firebase from '../../../config/fbConfig'
import Prompt from './Prompt'

//Actions
import { returnTheme, setTheme } from '../../../actions/storageActions'
import { exportBackup, importBackup } from '../../../actions/fbQuery'
import { hideModal } from '../../../actions/general'

//Components
import SettingsSection from './MenuFields/SettingsSection'
import AboutSection from './MenuFields/AboutSection'
import ThemeSection from './MenuFields/ThemeSection'

class SettingsModal extends Component {
    render() {
        return (
            <div className={'Settings Settings-Inactive '+ returnTheme() + '-t-modal'}>
                <Prompt promptText={this.state.promptText}/>

                <div className="settings-container">
                    <div className="main-menu-container modal-w">
                        <SettingsSection drawFormatOptions={this.drawFormatOptions} togglePrompt={this.togglePrompt} columnInput={this.columnInput} checkIfLogged={this.checkIfLogged} setEngine={this.props.setEngine}></SettingsSection>
                        <ThemeSection/>
                        <AboutSection/>
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
        
        if(localStorage.getItem('engineTypo')){
            document.getElementsByName(localStorage.getItem('engineTypo'))[0].setAttribute('selected', '1')
        }
        
        if(localStorage.getItem('formatTypo')){
            document.getElementsByName(localStorage.getItem('formatTypo'))[0].setAttribute('selected', '1')
        }

        document.addEventListener("click", e => {
            var els = {
                prefix: 'Settings-Inactive',
                element: '.Settings',
                button: '.con-menu',
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