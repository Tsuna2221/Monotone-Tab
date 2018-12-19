import React, { Component } from 'react';
import firebase from '../../config/fbConfig'

//Actions
import { loginPerson, signOutPerson } from '../../actions/fbQuery'

class AccountModal extends Component {
    render() {
        return (
            <div className='AccountModal account-modal-inactive'>
                <div className="account-container">
                    <div className="account-field account-email">
                        <label htmlFor="account-email">Email</label>
                        <div className="account-email-input">
                            <input onChange={this.handleInput} name="email" type="email"/>
                            <div className="account-input-border"></div>
                        </div>
                    </div>
                    <div className="account-field account-password">
                        <label htmlFor="account-password">Password</label>
                        <div className="account-password-input">
                            <input onChange={this.handleInput} name="password" type="password"/>
                            <div className="account-input-border"></div>
                        </div>
                    </div>

                    <div className="account-buttons">
                        <div onClick={this.login} className="account-btn login-btn">Log In</div>
                        <div onClick={this.signout} className="account-btn signout-btn">Sign Out</div>
                    </div>
                </div>
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
            var avatar = document.querySelector('.con-avatar')

            if (!inactive && event.target !== avatar && !event.target.closest(".AccountModal")){
                element.classList.toggle(prefix)
            };
        });

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('logged')
            } else {
                console.log('not logged in')
            }
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

    signout = () => {
        signOutPerson()
    }
}

export default AccountModal;