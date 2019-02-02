import React, { Component } from 'react';
import moment from "moment"

import Google from '../assets/Google.svg'
import Duck from '../assets/Duck_Duck_Go.svg'
import Bing from '../assets/Bing.svg'
import Startpage from '../assets/Startpage.svg'


//Images
import MenuButton from "../assets/MenuButton.svg";

import { returnTheme } from "../actions/storageActions"

class Navbar extends Component {
    render() {
        return (
            <nav className={"navbar-container "+ returnTheme() + "-t-background"}>
                <div className="search-bar-container">
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <input style={{backgroundImage: 'url('+ this.drawEngine().image +')', borderColor: this.drawEngine().color}} autoFocus className="search-input" type="text" placeholder={'Search on '+ this.drawEngine().name}/>
                    </form>
                </div>
                <div className="content-container">
                    <div className="con-date">
                        <p className="con-time">{this.state.currentTime}</p>
                    </div>
                    
                    {this.checkIfLogged()}
                    <img onClick={this.showSidebar} className="con-menu" src={MenuButton} alt=""/>
                </div>
            </nav>
        );
    }

    state = {
        
    }

    componentDidMount = () => setInterval(() => {this.setState({currentTime: this.currentTime()})}, 1000);
    
    drawEngine = () => {
        var engineName = localStorage.getItem('engineTypo')
        var engineSettings = {}
        var defaultEngines = ['google', 'bing', 'duck', 'startPage']

        if(defaultEngines.includes(engineName)){
            switch (engineName) {
                case 'google':
                    engineSettings = {
                        name: 'Google',
                        color: '#4285F4',
                        image: Google,
                        url: "https://www.google.com/search?q=%s%"
                    }
                    break;
                
                case 'bing':
                    engineSettings = {
                        name: 'Bing',
                        color: '#F4BD27',
                        image: Bing,
                        url: "https://www.bing.com/search?q=%s%"
                    }
                    break;

                case 'duck':
                    engineSettings = {
                        name: 'DuckDuckGo',
                        color: '#EC2027',
                        image: Duck,
                        url: "https://duckduckgo.com/?q=%s%"
                    }
                    break;

                case 'startPage':
                    engineSettings = {
                        name: 'Startpage',
                        color: '#6573ff',
                        image: Startpage,
                        url: "https://www.startpage.com/do/dsearch?cat=web&pl=opensearch&query=%s%&language=english"
                    }
                    break;

                default:
                    engineSettings = {
                        name: 'Google',
                        color: '#4285F4',
                        image: Google,
                        url: "https://www.google.com/search?q=%s%"
                    }
                    break;
            }
        }else{
            if(JSON.parse(localStorage.getItem(engineName)) !== null){
                var {name, color, url} = JSON.parse(localStorage.getItem(engineName))

                engineSettings = {
                    name: name,
                    color: color,
                    url: url
                }
            }else{
                localStorage.setItem('engineTypo', 'google')
            }
            
        }

        return engineSettings
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var input = document.querySelector('.search-input').value.replace(' ', '+')
        var location = this.drawEngine().url.replace('%s%', input)

        window.location.href = location
    }

    currentTime = () => moment().format(localStorage.getItem('formatTypo') || 'MMMM Do YYYY, h:mm:ss a');

    showSidebar = () => document.querySelector('.Settings').classList.toggle('Settings-Inactive')

    toggleModal = () => document.querySelector('.AccountModal').classList.toggle('account-modal-inactive')
    
    checkIfLogged = () => this.props.state.isLogged === true ? 
    <p onClick={this.toggleModal} className="con-login">{'Hello, ' + this.props.state.currentPerson.displayName || this.props.state.currentPerson.email}</p> :
    <p onClick={this.toggleModal} className="con-login">Log In</p>
}

export default Navbar;