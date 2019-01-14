import React, { Component } from 'react';
//Actions
import { hideModal } from '../../../actions/general'

//Images
import ArrowIcon from '../../../assets/NoteArrow.svg'

class NotesModal extends Component {
    render() {
        return (
            <div className='Notes Notes-Inactive modal-g'>
                <div className="modal-w">
                    <h1 className="head-w">Notes</h1>
                    <div className="field-w">
                        {this.drawNotes()}
                    </div>
                </div>
            </div>
        );
    }

    state = {

    }

    componentDidMount = () => {
        document.addEventListener("click", e => {
            var els = {
                prefix: 'Notes-Inactive',
                element: '.Notes',
                button: '.note-icon',
            }

            hideModal(els, e)
        });
    }

    drawNotes = () => {
        var notes = this.props.notes
        if(notes){
            if(notes.length > 0){
                return notes.map(note => {
                    var { name, id } = note
                    return (
                        <div key={id} className="note-item">
                            <div className="note-cell" >
                                <img data-id={id} onClick={this.showContent} className="note-arrow" src={ArrowIcon} alt=""/>
                                <div className="note-title">
                                    <p className="text-w">{name}</p>
                                </div>
                            </div>
                            <div name={id} className="note-content">
                                {this.drawContent(id)}
                            </div>
                        </div>
                    )
                });
            }else{
                return <label className="label-w">No notes found.</label>
            }
        }else if(notes === undefined){
            return <label className="label-w">Loading notes...</label>
        }
    }

    drawContent = (id) => {
        var notes = this.props.notes

        return notes.map(note => {
            if(note.id === id){
                var parag = note.content.split('<br />')
                return parag.map(para => {
                    return (<p className="text-w">{para}</p>)
                })
            }
            return null
        })

        // return notes.map(note => {
        //     var parag = note.content.split('<br />')
        //     return parag.map(para => {
        //         return (<p className="text-w">{para}</p>)
        //     })
        // });
    }

    showContent = (e) => {
        var id = e.target.dataset.id
        var content = document.getElementsByName(id)[0]

        content.classList.toggle('note-content-active')
        e.target.classList.toggle('note-arrow-active')
    }
}

export default NotesModal;