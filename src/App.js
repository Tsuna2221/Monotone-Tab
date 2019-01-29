import React, { Component } from 'react';
import firebase from './config/fbConfig'

//Components
import Navbar from './components/Navbar'
import QuickLinks from './components/QuickLinks'
import FirstStart from './components/FirstStart'

//Modals
import AccountModal from './components/Modals/AccountModal'
import SettingsModal from './components/Modals/SidebarModals/Settings'

//Actions
import { setCustomTheme } from './actions/general'
import { returnTheme } from './actions/storageActions'

class App extends Component {
	render() {
		this.drawIfFirstStart()
		return (
			<div className="App">
				{/* General */}
				{this.drawIfFirstStart()}
				<Navbar state={this.state}/>
				<QuickLinks exec={this.exec} isSelecting={this.state.isSelecting}/>

				{/* Modals */}
				<AccountModal isLogged={this.state.isLogged} currentPerson={this.state.currentPerson} />

				{/* Sidebar Modals */}
				<SettingsModal setSelection={this.setSelection} setEngine={this.setEngine} updateState={this.updateState}/>	

				{/* Transition */}
				<div className="transition-bg"></div>
			</div>			
		);
	}

	state = {
		engineTypo: 'google',
		isSelecting: false
	}

	exec = func => func('default')

	componentDidMount = () => {
		if(localStorage.getItem('theme') === 'custom'){setCustomTheme()}

		var bg = document.querySelector('.t-dtc')
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				var { email, emailVerified, uid, isAnonymous, displayName } = user

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

		bg.classList.value = bg.classList.value.replace('theme-c', returnTheme() + '-t-body-bg')
	}

	setEngine = (key, val) => {
		this.setState({[key]: val})
		localStorage.setItem(key, val)
	}

	setSelection = (bool) => this.setState({isSelecting: bool})

	drawIfFirstStart = () => localStorage.getItem('isFirstStart') === null ? <FirstStart/> : null

	updateState = () => this.setState({...this.state})
}

export default App;
