import React, { Component } from 'react';

//Images
import NoteButton from "./assets/NoteButton.svg";

//Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import QuickLinks from './components/QuickLinks'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar isVisible={this.state.sidebarVisible} showSidebar={this.showSidebar}/>
				<Sidebar isVisible={this.state.sidebarVisible}/>
				<QuickLinks/>
				<div className="new-note-btn">
					<img src={NoteButton} alt=""/>
				</div>
			</div>			
		);
	}

	state = {
		'sidebarVisible': 'inactive'
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
