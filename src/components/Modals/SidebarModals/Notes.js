import React, { Component } from 'react';

//Images
import ArrowIcon from '../../../assets/NoteArrow.svg'

class NotesModal extends Component {
    render() {
        return (
            <div className='Notes Notes-Inactive'>
                <div className="notes-container">
                    <p>Notes</p>
                    {this.drawNotes()}
                </div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", function(event) {
            var prefix = 'Notes-Inactive'
            var element = document.querySelector('.Notes')
            var inactive = document.querySelector('.Notes-Inactive')
            var button = document.querySelector('.note-icon')

            if (!inactive && event.target !== button && !event.target.closest(".Notes")){
                if(element){
                    element.classList.toggle(prefix)
                }
            };
        });
    }

    drawNotes = () => {
        var notes = this.props.notes
        if(notes){
            if(notes.length > 0){
                return notes.map(note => {
                    var { name, content, id } = note
                    return (
                        <div key={id} className="note-item">
                            <div className="note-cell" >
                                <img data-id={id} onClick={this.showContent} className="note-arrow" src={ArrowIcon} alt=""/>
                                <div className="note-title">
                                    <p>{name}</p>
                                </div>
                            </div>
                            <div name={id} className="note-content">
                                <p>{content}</p>
                            </div>
                        </div>
                    )
                });
            }else{
                return <p>No notes found.</p>
            }
        }else if(notes === undefined){
            return <p>Loading notes...</p>
        }
    }

    showContent = (e) => {
        var id = e.target.dataset.id
        var content = document.getElementsByName(id)[0]

        content.classList.toggle('note-content-active')
        e.target.classList.toggle('note-arrow-active')
    }
}

export default NotesModal;