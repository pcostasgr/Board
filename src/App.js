import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export class Greeding extends React.Component{
	constructor(props){
		super(props);
		this.state={name:"Costas"};
	}


	render(){
		return (
			<div>
				<hl> My name is {this.props.name} </hl>
			</div>
		);
	}
}

Greeding.propTypes = {
		name: React.PropTypes.string
	};

export function doSomething(){
	alert("HEYYYYY");
}

export default App;
