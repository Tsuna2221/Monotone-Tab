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
import AccountModal from './components/Modals/AccountModal'
import SettingsModal from './components/Modals/SidebarModals/Settings'
import NotesModal from './components/Modals/SidebarModals/Notes'

const db = firebase.firestore();

class App extends Component {
	render() {
		this.drawIfFirstStart()
		return (
			<div className="App">
				{this.drawIfFirstStart()}
				<Navbar isLogged={this.state.isLogged} currentPerson={this.state.currentPerson} isVisible={this.state.sidebarVisible} showSidebar={this.showSidebar}/>
				<AccountModal isLogged={this.state.isLogged} currentPerson={this.state.currentPerson} />
				<Sidebar isVisible={this.state.sidebarVisible}/>
				<QuickLinks/>

				{/* Sidebar Modals */}
				<SettingsModal updateState={this.updateState}/>
				<NotesModal notes={this.state.currentNotes}/>
				{this.showNoteButtonIfLogged()}
				<div className="transition-bg"></div>
			</div>			
		);
	}

	state = {
		'sidebarVisible': 'inactive',
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				var { email, emailVerified, uid, isAnonymous, displayName } = user
				var notesCollection = db.collection('person').doc(uid).collection('notes').orderBy('createdAt', 'desc')
				//.orderBy("body", "asc")
				
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
	
	drawIfFirstStart = () => {
		if(Cookies.get('isFirstStart') === undefined){
			return <FirstStart/>
		}
	}

	showSidebar = () => {
		if(this.state.sidebarVisible === 'inactive'){
			this.setState({
				'sidebarVisible': 'active'
			})
		}else{
			this.setState({
				'sidebarVisible': 'inactive'
			})
		}
	}

	updateState = () => {
			this.setState({
				...this.state
			})
	}

	showNoteButtonIfLogged = () => {
		if(this.state.isLogged){
			return <NewNote isLogged={this.state.isLogged} currentPerson={this.state.currentPerson}/>
		}
	}
}

export default App;
