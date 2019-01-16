import React, { Component } from 'react';
//Actions
import { hideModal } from '../../actions/general'

//Actions
import { loginPerson, signOutPerson } from '../../actions/fbQuery'
import { returnTheme } from "../../actions/storageActions"

class AccountModal extends Component {
    render() {
        return (
            <div className={'AccountModal account-modal-inactive '+ returnTheme() + '-t-modal'}>
                {this.checkIfLogged()}
            </div>
        );
    }

    componentDidMount = () => {
        document.addEventListener("click", (e) => {
            var els = {
                prefix: 'account-modal-inactive',
                element: '.AccountModal',
                button: '.con-login',
            }

            hideModal(els, e)
        });
    }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    login = () => loginPerson(this.state.email, this.state.password)

    checkIfLogged = () => {
        if(this.props.isLogged){
            var { displayName, email } = this.props.currentPerson

            return (
                <div className="account-container">
                    <div className="modal-w">
                        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Account</h1>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"}>User</label>
                            <div className="input-w">
                                <p className={"text-w "+ returnTheme() + "-t-text-w"}>{displayName}</p>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Email</label>
                            <div className="input-w">
                                <p className={"text-w "+ returnTheme() + "-t-text-w"}>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={signOutPerson} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>Sign Out</div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="account-container">
                    <div className="modal-w">
                        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Log In</h1>
                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Email</label>
                            <div className="input-w input-w175">
                                <input onChange={this.handleInput} name="email" type="email"/>
                            </div>
                        </div>
                        <div className={returnTheme() + "-t-field-w"}>
                            <label className={"label-w "+ returnTheme() + "-t-text-w"}>Password</label>
                            <div className="input-w input-w175">
                                <input onChange={this.handleInput} name="password" type="password"/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={this.login} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>Log In</div>
                    </div>
                </div>
            )
        }
    }
}

export default AccountModal;