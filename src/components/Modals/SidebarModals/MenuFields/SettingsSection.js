import React from 'react';

import { returnTheme } from '../../../../actions/storageActions'

var SettingsSection = (props) => (
    <div className="section">
        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Settings</h1>
        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Quick Links</h2>

        <div className="field-w">
            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Columns</label>
            <div className="range-w">
                {props.columnInput()}
            </div>
        </div>

        <div className="field-w">
            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Remove Items</label>
            
            <div className="remove-btns flex-w">
                <div data-type='selective' onClick={props.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Selective</div>
                <div data-type='remove-all' onClick={props.togglePrompt} className={"button-w "+ returnTheme() + "-t-button-w"}>Remove All</div>
            </div>
        </div>
        

        <div className="field-w">
            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Backup Folders and Links</label>
            
            {props.checkIfLogged()}
        </div>
        <hr className="side-separator"/>
        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Search Engine and Date</h2>

        <div className="field-w">
            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Search Engine</label>
            
            <div className="remove-btns flex-w">
                <select data-type='backup' onChange={(e) => props.setEngine(e.target.name, e.target.value)} name="engineTypo" className="select-w">
                    <option name='google' value="google">Google</option>
                    <option name='bing' value="bing">Bing</option>
                    <option name='duck' value="duck">DuckDuckGo</option>
                    <option name='translate' value="translate">Google Translate</option>
                    <option name='startPage' value="startPage">Startpage</option>
                </select>
            </div>
        </div>

        <div className="field-w">
            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Default Date Format</label>
            
            <div className="remove-btns flex-w">
                <select data-type='backup' onChange={(e) => props.setEngine(e.target.name, e.target.value)} name="formatTypo" className="select-w">
                    {props.drawFormatOptions()}
                </select>
            </div>
        </div>
    </div>
)


export default SettingsSection;