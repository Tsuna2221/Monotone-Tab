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
            return (
                <div className="account-container">
                    <div className="account-buttons">
                        <div onClick={signOutPerson} className="account-btn signout-btn">Sign Out</div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="account-container">
                    <div className="account-field account-email">
                        <label htmlFor="account-email">Email</label>
                        <div className="account-email-input">
                            <input onChange={this.handleInput} name="email" type="email"/>
                        </div>
                    </div>
                    <div className="account-field account-password">
                        <label htmlFor="account-password">Password</label>
                        <div className="account-password-input">
                            <input onChange={this.handleInput} name="password" type="password"/>
                        </div>
                    </div>

                    <div className="account-buttons">
                        <div onClick={this.login} className="account-btn login-btn">Log In</div>
                    </div>
                </div>
            )
        }
    }
}

export default AccountModal;