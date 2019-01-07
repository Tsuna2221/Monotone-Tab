import React, { Component } from 'react';

//Images
import NoteButton from "../assets/NoteButton.svg";

class NewNote extends Component {
    render() {
        return (
            <div className='NewNoteButton'>
                <div onClick={this.toggleModal} className="new-note-btn">
					<img src={NoteButton} alt=""/>
				</div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", function(event) {
            var prefix = 'note-modal-inactive'
            var element = document.querySelector('.AddNoteModal')
            var inactive = document.querySelector('.note-modal-inactive')
            var button = document.querySelector('.new-note-btn')

            if (!inactive && event.target !== button && !event.target.closest(".AddNoteModal")){
                if(element){
                    element.classList.toggle(prefix)
                }
            };
        });
    }

    toggleModal = () => document.querySelector('.AddNoteModal').classList.toggle('note-modal-inactive')
}

export default NewNote;