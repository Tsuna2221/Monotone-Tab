import React, { Component } from 'react';

//Actions
import { storeNote } from '../../actions/fbQuery'
import { checkIfNotNull } from '../../actions/formValidator'

class AddNoteModal extends Component {
    render() {
        return (
                <div className='AddNoteModal note-modal-inactive'>
                    <div className="modal-w">
                        <h1 className="head-w">New Note</h1>

                        <div className="field-w">
                            <label className="label-w">Note Name</label>
                            <div className="input-w input-w175">
                                <input onChange={this.handleInput} placeholder="Note Example" autoComplete="off" spellCheck="false" name='name' type="text"/>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className="label-w">Note Content</label>
                            <div className="input-area-w input-a175">
                                <textarea onChange={this.handleInput} autoComplete="off" spellCheck="false" name='body' type="text" rows="7"/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={this.storeNote} className="btn-w f-w">Add Note</div>
                    </div>
                </div>
        );
    }

    handleInput = (e) => this.setState({[e.target.name]: e.target.value})

    storeNote = () => {
        var name = this.state.name;
        var body = this.state.body.replace(/\r?\n/g, ' <br /> ');
        var personId = this.props.currentPerson.uid
        var modal = document.querySelector('.AddNoteModal')

        
        if(checkIfNotNull(name, body) === true){storeNote(name, body, personId); modal.classList.toggle('note-modal-inactive')}
    }
}

export default AddNoteModal;