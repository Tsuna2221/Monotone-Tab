import React, { Component } from 'react';

//Actions
import { returnTheme, returnEngines } from '../../../../actions/storageActions'

class SettingsSection extends Component {
    render() {
        return (
            <div className="section">
                <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Settings</h1>
                <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Quick Links</h2>
            
                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Columns</label>
                    <div className="range-w">
                        {this.props.columnInput()}
                    </div>
                </div>

                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Remove Items</label>
                    
                    <div className="remove-btns flex-w">
                        <div data-type='selective' onClick={this.props.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Selective</div>
                        <div data-type='remove-all' onClick={this.props.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Remove All</div>
                    </div>
                </div>

                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Backup Folders and Links</label>
                    
                    {this.props.checkIfLogged()}
                </div>
                <hr className="side-separator"/>
                <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Search Engine and Date</h2>

                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Date Format</label>
                    
                    <div className="remove-btns flex-w">
                        <select data-type='backup' onChange={(e) => this.props.setEngine(e.target.name, e.target.value)} name="formatTypo" className="select-w">
                            {this.props.drawFormatOptions()}
                        </select>
                    </div>
                </div>

                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Search Engine</label>
                    
                    <div className="remove-btns flex-w">
                        <select data-type='backup' onChange={(e) => this.props.setEngine(e.target.name, e.target.value)} name="engineTypo" className="select-w">
                            <option name='google' value="google">Google</option>
                            <option name='bing' value="bing">Bing</option>
                            <option name='duck' value="duck">DuckDuckGo</option>
                            <option name='startPage' value="startPage">Startpage</option>
                            {this.drawEngines()}
                        </select>
                    </div>
                </div>

                <div className="field-w">
                    <label className={"label-w "+ returnTheme() + "-t-text-w"}>Manage Engines</label>
                    
                    <div className="remove-btns flex-w">
                        <div data-type='selective' onClick={this.toggleModal} className={"button-w "+ returnTheme() + "-t-button-w"}>Manage</div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    drawEngines = () => {
        return returnEngines().map(engine => {
            return (<option key={engine.id} name={engine.id} value={engine.id}>{engine.name}</option>)
        })
    }

    toggleModal = () => document.querySelector('.engine-modal').classList.toggle('engine-modal-active')
}

export default SettingsSection;