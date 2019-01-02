import React, { Component } from 'react';

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

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", function(event) {
            var prefix = 'account-modal-inactive'
            var element = document.querySelector('.AccountModal')
            var inactive = document.querySelector('.account-modal-inactive')
            var button = document.querySelector('.con-login')

            if (!inactive && event.target !== button && !event.target.closest(".AccountModal")){
                element.classList.toggle(prefix)
            };
        });
    }

    handleInput = (e) => {
        var key = e.target.name
        var value = e.target.value

        this.setState({
            [key]: value
        })
    }

    login = () => {
        var {email, password} = this.state
        loginPerson(email, password)
    }

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