import React, { Component } from 'react';

//Imgs
import Trash from '../../assets/Trash.svg'

//Actions
import { returnTheme, returnEngines, returnLastEngine } from '../../actions/storageActions'

class QuickLinkModal extends Component {
    render() {
        return (
            <div onClick={this.closeModal} className="engine-modal">
                <div className={"engine-modal-content "+ returnTheme() + "-t-modal"}>
                    <div className="modal-w">
                        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Manage Engines</h1>

                        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Add Engine</h2>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="name">Name</label>
                            <div className="input-w">
                                <input onChange={this.handleItem} autoComplete="off" name="engineName" className="input" placeholder="Example" type="text"/>
                            </div>
                        </div>
                        
                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="url">URL (With %s% in place of query)</label>
                            <div className="input-w">
                                <input onChange={this.handleItem} autoComplete="off" name="engineUrl" className="input" placeholder="http://www.example.com/search?p=%s%" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className=".btn-container-w">
                        <div onClick={this.storeEngine} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>Add Search Engine</div>
                    </div>

                    <div className="modal-w engine-entry">
                        <h2 className={"section-w "+ returnTheme() + "-t-text-w"}>Custom Entries</h2>

                        <div className="field-w engine-entry-container">
                            {this.drawEngines()}
                        </div>
                    </div>
                    <div className=".btn-container-w">
                        <div onClick={() => window.location.reload()} className={"btn-w "+ returnTheme() + "-t-btn-w f-w"}>Done</div>
                    </div>
                </div>
                
            </div>
        );
    }

    state = {
        engines: returnEngines()
    }

    closeModal = (e) => e.target === document.querySelector('.engine-modal') ? document.querySelector('.engine-modal').classList.toggle('engine-modal-active') : null

    drawEngines = () => {
        return this.state.engines.map(engine => {
            return (
                <div className="engine-item">
                    <div className="engine-item-name"><p>{engine.name}</p></div>
                    <div className="engine-item-url"><p>{engine.url}</p></div>
                    <div className="engine-item-delete"><img onClick={() => this.removeEngine(engine.id)} src={Trash} alt=""/></div>
                </div>
            )
        })
    }

    handleItem = (e) => this.setState({[e.target.name]: e.target.value})

    storeEngine = () => {
        var name = this.state.engineName
        var url = this.state.engineUrl

        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }

        var obj = {
            name: name,
            url: url,
            color: '#507bc1',
            id: 'sEngine' + (returnLastEngine() + 1)
        }

        localStorage.setItem('sEngine' + (returnLastEngine() + 1), JSON.stringify(obj))
        this.setState({engines: returnEngines()})
    }

    removeEngine = (id) => {
        localStorage.removeItem(id)

        this.setState({engines: returnEngines()})
    }
}

export default QuickLinkModal;