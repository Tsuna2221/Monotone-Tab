import React, { Component } from 'react';

//Images
import NotesIcon from "../assets/Notes.svg";
import Calendar from "../assets/Calendar.svg";
import Evernote from "../assets/Evernote.svg";
import Mail from "../assets/Mail.svg";
import Info from "../assets/Info.svg";
import Setting from "../assets/Setting.svg";
import Expand from "../assets/Expand.svg";

class Sidebar extends Component {
    render() {
        return (
            <div id='Sidebar'>
                <div className={'sidebar-container sidebar-' + this.props.isVisible} style={{'right': 0}}>
                    <div className="sidebar-items">
                        <div className="side-set">
                            <img onClick={this.showNotes} className="side-icon note-icon" src={NotesIcon} alt=""/>
                            <img className="side-icon calendar-icon" src={Calendar} alt=""/>
                        </div>

                        <hr className="side-separator"/>

                        <div className="side-set">
                            <img className="side-icon evernote-icon" src={Evernote} alt=""/>
                            <img className="side-icon mail-icon" src={Mail} alt=""/>
                        </div>

                        <hr className="side-separator"/>

                        <div className="side-set">
                            <img className="side-icon info-icon" src={Info} alt=""/>
                            <img onClick={this.showSettings} className="side-icon settings-icon" src={Setting} alt=""/>
                            <img className="side-icon expand-icon" src={Expand} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    showSettings = () => {
        var stgModal = document.querySelector('.settings-container')

        stgModal.style.display = 'block'
    }

    showNotes = () => {
        var notesModal = document.querySelector('.Notes')

        notesModal.classList.toggle('Notes-Inactive')
    }
}

export default Sidebar;