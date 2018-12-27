import React, { Component } from 'react';

//Actions
import { storeNote } from '../../actions/fbQuery'
import { checkIfNotNull } from '../../actions/formValidator'

class AddNoteModal extends Component {
    render() {
        return (
            <div className='AddNoteModal note-modal-inactive'>
                <div className="new-note-modal">
                    <div className="note-field note-name">
                        <label>Note Name</label>
                        <div className="note-name-input">
                            <input onChange={this.handleInput} autoComplete="off" spellCheck="false" name='name' type="text"/>
                        </div>
                    </div>

                    <div className="note-field note-body">
                        <label>Note Content</label>
                        <div className="note-name-body">
                            <textarea onChange={this.handleInput} autoComplete="off" spellCheck="false" name='body' type="text" rows="7"/>
                        </div>
                    </div>

                    <div onClick={this.storeNote} className="note-add-btn">Add Note</div>
                </div>
            </div>
        );
    }

    state = {

    }

    handleInput = (e) => {
        var key = e.target.name;
        var body = e.target.value;

        this.setState({
            [key]: body
        })
    }

    storeNote = () => {
        var name = this.state.name;
        var body = this.state.body;
        var personId = this.props.currentPerson.uid
        
        if(checkIfNotNull(name, body) === true){storeNote(name, body, personId)}
    }
}

export default AddNoteModal;