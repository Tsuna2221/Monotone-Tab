import React, { Component } from 'react';
import Cookies from 'js-cookie'

//Images
import NoteButton from "./assets/NoteButton.svg";

//Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import QuickLinks from './components/QuickLinks'
import FirstStart from './components/FirstStart'

//Modals
import SettingsModal from './components/Modals/SidebarModals/Settings'
import AccountModal from './components/Modals/AccountModal'

class App extends Component {
	render() {
		this.drawIfFirstStart()
		return (
			<div className="App">
				{this.drawIfFirstStart()}
				<Navbar isVisible={this.state.sidebarVisible} showSidebar={this.showSidebar}/>
				<AccountModal/>
				<Sidebar isVisible={this.state.sidebarVisible}/>
				<QuickLinks/>
				<SettingsModal/>
				<div className="new-note-btn">
					<img src={NoteButton} alt=""/>
				</div>
			</div>			
		);
	}

	state = {
		'sidebarVisible': 'inactive'
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
}

export default App;
