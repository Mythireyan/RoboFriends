import React,{ Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends Component {
	constructor(){
		super(); 
		 this.state= {
			robots: [ ] ,
			searchfield : ' '
		}
	}
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response =>{
			 return response.json();
		})
		.then( users => {
				this.setState({robots :users});
		})

	}
	onSearchChange  = (event)=>{
		this.setState({searchfield : event.target.value})
	}

	render(){
			const {robots , searchfield} = this.state;    	//Destructuring
			const filterRobots =robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		});
			return (! robots.length) ?
				<h1 style = {{color : 'yellowgreen'}}>Loading</h1> :
			    (
		<div className='tc'>
			<h1 className = 'f1 ' style ={{color: 'rgba(0,0,0,.6)'}}>Robo-Friends</h1>
			<SearchBox searchChange = {this.onSearchChange}/>
			<Scroll>
				<ErrorBoundary>
							<CardList  robots={filterRobots}/>
				</ErrorBoundary>
				</Scroll>
		</div>
		);
	}	
}

export default App;