import React, { Component } from 'react';
//Actions
import { hideModal } from '../../actions/general'

//Actions
import { loginPerson, signOutPerson } from '../../actions/fbQuery'

class AccountModal extends Component {
    render() {
        return (
            <div className='AccountModal account-modal-inactive'>
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
                        <h1 className="head-w">Account</h1>

                        <div className="field-w">
                            <label className="label-w">User</label>
                            <div className="input-w">
                                <p className="text-w">{displayName}</p>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className="label-w">Email</label>
                            <div className="input-w">
                                <p className="text-w">{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={signOutPerson} className="btn-w f-w">Sign Out</div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="account-container">
                    <div className="modal-w">
                        <h1 className="head-w">Log In</h1>
                        <div className="field-w">
                            <label className="label-w">Email</label>
                            <div className="input-w input-w175">
                                <input onChange={this.handleInput} name="email" type="email"/>
                            </div>
                        </div>
                        <div className="field-w">
                            <label className="label-w">Password</label>
                            <div className="input-w input-w175">
                                <input onChange={this.handleInput} name="password" type="password"/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={this.login} className="btn-w f-w">Log In</div>
                    </div>
                </div>
            )
        }
    }
}

export default AccountModal;