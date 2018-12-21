import React, { Component } from 'react';
import moment from "moment"

//Images
import MenuButton from "../assets/MenuButton.svg";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar-container">
                <div className="search-bar-container">
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <input autoFocus className="search-input" type="text" placeholder={'Search on Google'}/>
                    </form>
                </div>
                <div className="content-container">
                    <div className="con-date">
                        <p className="con-time">{this.state.currentTime}</p>
                    </div>
                    
                    {this.checkIfLogged()}
                    <img onClick={this.props.showSidebar} className="con-menu" src={MenuButton} alt=""/>
                </div>
            </nav>
        );
    }

    state = {
        
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({
                currentTime: this.currentTime()
            })
        },1000);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var input = document.querySelector('.search-input').value.replace(' ', '+')
        
        window.location.href = "https://www.google.com/search?q=" + input
    }

    currentTime = () => moment().format('hh:mm:ss  |  dddd, Do');

    toggleModal = () => document.querySelector('.AccountModal').classList.toggle('account-modal-inactive')
    
    checkIfLogged = () => {
        if(this.props.isLogged){
            var {displayName, email} = this.props.currentPerson
            return <p onClick={this.toggleModal} className="con-login">{`Hello, ${displayName || email}!`}</p>
        }else{
            return <p onClick={this.toggleModal} className="con-login">Log In</p>
        }
    }
}

export default Navbar;