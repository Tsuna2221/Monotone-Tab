import React, { Component } from 'react';
import { validateStartForm } from '../actions/formValidator'
import { createNewPerson } from '../actions/fbQuery'

import Cookies from 'js-cookie'


class FirstStart extends Component {
    render() {
        this.hideText()
        return (
            <div id='FirstStart'>
                <div className="welcome no2">
                    <div id="text">
                        <h1 className="welcome-text">Welcome to Monotone!</h1>
                    </div>

                    <div className="form-signup-container">
                        <form name="signup">
                            <h1>Sign Up</h1>
                            <h2>To optimize your experience and use specific <br/> functionalities, please, consider signing up.</h2>
                            
                            <div className="sign-label signup-name">
                                <label className="signup-label" htmlFor="name">User Name</label>
                                <div className="signup-input sign-name">
                                    <input onChange={this.handleInput} autoComplete="off" spellCheck="false" id="signup-name" name="name" type="text" required/>
                                    <div className="sign-input-border"></div>
                                </div>
                            </div>

                            <div className="sign-label signup-email">
                                <label className="signup-label" htmlFor="email">Email</label>
                                <div className="signup-input sign-name">
                                    <input onChange={this.handleInput} autoComplete="off" spellCheck="false" id="signup-email" name="email" type="email" required/>
                                    <div className="sign-input-border"></div>
                                </div>
                            </div>  

                            <div className="sign-label signup-password">
                                <label className="signup-label" htmlFor="password">Password</label>
                                <div className="signup-input sign-name">
                                    <input onChange={this.handleInput} autoComplete="off" spellCheck="false" id="signup-password" name="password" type="password" required/>
                                    <div className="sign-input-border"></div>
                                </div>
                            </div>

                            <div className="sign-label signup-confirm-password">
                                <label className="signup-label" htmlFor="confirm-password">Confirm Password</label>  
                                <div className="signup-input sign-name">
                                    <input onChange={this.handleInput} autoComplete="off" spellCheck="false" id="signup-confirm" name="confirm" type="password" required/>   
                                    <div className="sign-input-border"></div>
                                </div>
                            </div>

                            <div className="signup-buttons">
                                <div onClick={this.hideStart} className="sign-guest-btn sign-btn">
                                    <p>Enter as Guest</p>
                                </div>

                                <div onClick={this.storePerson} className="sign-confirm-btn sign-btn">
                                    <p>Sign Up</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    storePerson = () => validateStartForm(this.state) ? (createNewPerson(this.state.name, this.state.email.toLowerCase(), this.state.password), this.hideStart()) : null

    hideText = () => {
        setTimeout(() => {
            var text = document.querySelector('.welcome-text');
            var form = document.querySelector('.form-signup-container') 

            form.style.display = 'flex'
            text.style.opacity = 0
            
            setTimeout(() => {
                var form = document.querySelector('.form-signup-container') 
                form.style.opacity = 1
                form.style.display = 'flex'
            }, 1500)

        }, 4000);
    }

    hideStart = () => {
        var start = document.querySelector('#FirstStart') 
        var form = document.querySelector('.form-signup-container') 
        form.style.opacity = 0

        setTimeout(() => {
            start.style.transform = 'translateX(-100%)'

            setTimeout(() => {
                start.style.display = 'none'
                localStorage.setItem('isFirstStart', 'false')
            },2000)
        },1500)
    }
}

export default FirstStart;