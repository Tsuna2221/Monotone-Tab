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
                    
                    <img onClick={this.showSidebar} className="con-menu" src={MenuButton} alt=""/>
                </div>
            </nav>
        );
    }

    state = {
        currentTime: ""
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

    showSidebar = () => {
        this.props.showSidebar()
    }

    currentTime = () => {
        var time = moment().format('h:mm:ss, MMMM Do YYYY');
        return time;
    }
}

export default Navbar;
