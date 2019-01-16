import React, { Component } from 'react';

import { returnTheme } from "../../../actions/storageActions"

class Prompt extends Component {
    render() {
        var { head, label } = this.props.promptText
        return (
            <div className={'app-prompt app-prompt-inactive '+ returnTheme() + '-t-modal'}>
                <div className="modal-w">
                    <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>{head}</h1>
                    <div className="field-w">
                        <label className={"label-w "+ returnTheme() + "-t-text-w"}>{label}</label>
                    </div>
                </div>
                {this.drawButtons()}
            </div>
        );
    }

    state = {

    }

    execPrompt = (e) => {
        var { fnc1, fnc2 } = this.props.promptText
        var fncType = e.target.dataset.fnc
        var prompt = document.querySelector('.app-prompt')
        prompt.classList.toggle('app-prompt-inactive')

        if(fncType === 'fnc1'){
            if(fnc1){
                fnc1()
            }else{
                return null
            }
        }else if(fncType === 'fnc2'){
            if(fnc2){
                fnc2()
            }else{
                return null
            }
        }
    }

    drawButtons = () => {
        var { num1, num2 } = this.props.promptText.options
        
        if( num2 ){
            return (
                <div className="btn-container-w">
                    <div data-fnc="fnc1" onClick={this.execPrompt} className={"btn-w "+ returnTheme() + "-t-btn-w"}>{num1}</div>
                    <div data-fnc="fnc2" onClick={this.execPrompt} className={"btn-w "+ returnTheme() + "-t-btn-w"}>{num2}</div>
                </div>
            )
        }else{
            return (
                <div className="btn-container-w">
                    <div data-fnc="fnc1" onClick={this.execPrompt} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>{num1}</div>
                </div>
            )
        }
    }
}

export default Prompt;