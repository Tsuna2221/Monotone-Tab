import React, { Component } from 'react';
//Actions
import { hideModal } from '../actions/general'
import { returnTheme } from "../actions/storageActions"

//Images
import NoteButton from "../assets/NoteButton.svg";

class NewNote extends Component {
    render() {
        return (
            <div className='NewNoteButton'>
                <div onClick={this.toggleModal} className={"new-note-btn "+ returnTheme() + "-t-background"}>
					<img src={NoteButton} alt=""/>
				</div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", e => {
            var els = {
                prefix: 'note-modal-inactive',
                element: '.AddNoteModal',
                button: '.new-note-btn',
            }

            hideModal(els, e)
        });
    }

    toggleModal = () => document.querySelector('.AddNoteModal').classList.toggle('note-modal-inactive')
}

export default NewNote;