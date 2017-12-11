import React from 'react';
import ReactDOM from 'react-dom';
import BoardActions from '../actions/BoardActions';
import BoardStores from '../stores/BoardStores';
import Immutable from 'immutable';

class AppView extends React.Component {
	constructor(props){
		super(props);
		this.onStateChanged=this.onStateChanged.bind(this);
		this.state = { data: BoardStores.getState() };  
	}

	componentWillUnmount() {    
    		this.listener.remove();  
  	}

 
	componentDidMount() {    
		
  	 	this.listener = BoardStores.addListener(this.onStateChanged); 

		BoardActions.addTodo('value1');
		BoardActions.addTodo('value22');
		
	}

	onStateChanged() {    
		this.setState({ data:BoardStores.getState() });  
	}

  
	render(){
		var arr=this.state.data.get('data',0);
		var someValue=arr.get(0);
		if(arr.count()>0){
			return (<div> {someValue.value} </div>);
		}
		return ( 
			<div>Hello from Flux!}</div>
		);	
	}
}


export default AppView;
