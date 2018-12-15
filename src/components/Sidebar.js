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
                            <img className="side-icon" src={NotesIcon} alt=""/>
                            <img className="side-icon" src={Calendar} alt=""/>
                        </div>

                        <hr className="side-separator"/>

                        <div className="side-set">
                            <img className="side-icon" src={Evernote} alt=""/>
                            <img className="side-icon" src={Mail} alt=""/>
                        </div>

                        <hr className="side-separator"/>

                        <div className="side-set">
                            <img className="side-icon" src={Info} alt=""/>
                            <img className="side-icon" src={Setting} alt=""/>
                            <img className="side-icon" src={Expand} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }
}

export default Sidebar;