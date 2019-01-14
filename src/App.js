import React, { Component } from 'react';
import Cookies from 'js-cookie'
import firebase from './config/fbConfig'

//Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import QuickLinks from './components/QuickLinks'
import FirstStart from './components/FirstStart'
import NewNote from './components/NewNote'

//Modals
import AddNoteModal from './components/Modals/AddNoteModal'
import AccountModal from './components/Modals/AccountModal'
import SettingsModal from './components/Modals/SidebarModals/Settings'
import NotesModal from './components/Modals/SidebarModals/Notes'
import AboutModal from './components/Modals/SidebarModals/About'

const db = firebase.firestore();

class App extends Component {
	render() {
		this.drawIfFirstStart()
		return (
			<div className="App">
				{/* General */}
				{this.drawIfFirstStart()}
				<Navbar state={this.state}/>
				<Sidebar isVisible={this.state.sidebarVisible}/>
				<QuickLinks isSelecting={this.state.isSelecting}/>
				<AddNoteModal currentPerson={this.state.currentPerson}/>

				{/* Modals */}
				<AccountModal isLogged={this.state.isLogged} currentPerson={this.state.currentPerson} />

				{/* Sidebar Modals */}
				<SettingsModal setSelection={this.setSelection} setEngine={this.setEngine} updateState={this.updateState}/>
				<NotesModal notes={this.state.currentNotes}/>
				<AboutModal/>
				{this.showNoteButtonIfLogged()}
				

				{/* Transition */}
				<div className="transition-bg"></div>
			</div>			
		);
	}

	state = {
		engineTypo: 'google',
		isSelecting: false
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				var { email, emailVerified, uid, isAnonymous, displayName } = user
				var notesCollection = db.collection('person').doc(uid).collection('notes').orderBy('createdAt', 'desc')
				
				notesCollection.onSnapshot(res => {
					var notes = [];
					res.forEach(data => {
						notes.push(data.data())
					})
					this.setState({
						...this.state,
						currentNotes: notes
					})
				})

				this.setState({
					...this.state,
					isLogged: true,
					currentPerson: {
						email,
						emailVerified,
						uid,
						isAnonymous,
						displayName,
					}
				})
			}else{
				this.setState({
					isLogged: false
				})
			}
		});
	}

	setEngine = (key, val) => {
		this.setState({[key]: val})
		localStorage.setItem(key, val)
	}

	setSelection = (bool) => this.setState({isSelecting: bool})

	drawIfFirstStart = () => localStorage.getItem('isFirstStart') === null ? <FirstStart/> : null

	updateState = () => this.setState({...this.state})

	showNoteButtonIfLogged = () => this.state.isLogged ? <NewNote isLogged={this.state.isLogged} currentPerson={this.state.currentPerson}/> : null
}

export default App;
