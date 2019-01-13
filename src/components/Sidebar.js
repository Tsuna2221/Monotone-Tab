import React, { Component } from 'react';

//Images
import NotesIcon from "../assets/Notes.svg";
import Info from "../assets/Info.svg";
import Setting from "../assets/Setting.svg";

class Sidebar extends Component {
    render() {
        return (
            <div id='Sidebar'>
                <div className='sidebar-container'>
                    <div className="sidebar-items">
                        <div className="side-set">
                            <img onClick={this.showModal} className="side-icon note-icon" data-type="Notes" src={NotesIcon} alt=""/>
                            {/* <img className="side-icon calendar-icon" src={Calendar} alt=""/> */}
                        </div>

                        {/* <hr className="side-separator"/>

                        <div className="side-set">
                            <img className="side-icon evernote-icon" src={Evernote} alt=""/>
                            <img className="side-icon mail-icon" src={Mail} alt=""/>
                        </div> */}

                        {/* <hr className="side-separator"/> */}

                        <div className="side-set">
                            <img onClick={this.showModal} className="side-icon settings-icon" data-type="Settings" src={Setting} alt=""/>
                            <img onClick={this.showModal} className="side-icon about-icon" data-type="About"  src={Info} alt=""/>
                            {/* <img className="side-icon expand-icon" src={Expand} alt=""/> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    showModal = (e) => {
        var prefix = e.target.dataset.type
        var modal = document.querySelector(`.${prefix}`)
        
        modal.classList.toggle(`${prefix}-Inactive`)
    }
}

export default Sidebar;