import React, { Component } from 'react';
import { validateStartForm } from '../actions/formValidator'
import { createNewPerson } from '../actions/fbQuery'

class FirstStart extends Component {
    render() {
        this.hideText()
        return (
            <div id='FirstStart'>
                <div className="welcome">
                    <h1 className="main-text absolute">Welcome to Monotone!</h1>

                    <div className="form-signup-container">
                        <form className="signup-form" name="signup">
                            <h1 className="main-text">Sign Up</h1>
                            <h2 className="secondary-text">To optimize your experience and use specific <br/> functionalities, please, consider signing up.</h2>
                            
                            {this.drawFields()}

                            <div className="signup-buttons">
                                <div onClick={this.hideStart} className="sign-guest-btn sign-btn">Enter as Guest</div>
                                <div onClick={this.storePerson} className="sign-confirm-btn sign-btn">Sign Up</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    drawFields = () => {
        var fields = [
            {name: 'name', label: 'User Name', type: 'text'},
            {name: 'email', label: 'Email', type: 'email'},
            {name: 'password', label: 'Password', type: 'password'},
            {name: 'confirm', label: 'Confirm Password', type: 'password'}
        ]

        return fields.map(field => {
            var { name, label, type } = field

            return (
                <div key={name} className="signup-field">
                    <label className="signup-label">{label}</label>
                    <div className="signup-input">
                        <input onChange={this.handleInput} autoComplete="off" spellCheck="false" id={`signup-${name}`} name={name} type={type} required/>
                    </div>
                </div>
            )
        })
    }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    storePerson = () => validateStartForm(this.state) ? (createNewPerson(this.state.name, this.state.email.toLowerCase(), this.state.password), this.hideStart()) : null

    hideText = () => {
        setTimeout(() => {
            var text = document.querySelector('.main-text');
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