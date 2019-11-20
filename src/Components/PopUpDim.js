import React from 'react';

class PopUpDim extends React.Component{
	constructor(props){
		super(props);
		this.buttonClick=this.buttonClick.bind(this);	
		this.state={textbox:"",name:"test"};	
	}
       	
	buttonClick(){
		console.log("div button click");

		this.props.callf(this.input.value);
	}
		
	render(){
		return (	
			<div name="PopUpDim" className="popup-div" style={{ top:this.props.topValue,left:this.props.leftValue,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick} >click me</button><br></br>
				Value:<input type="text" name="description_field" ref={(input)=>{this.input=input;} }  />
			</div>
		);
	}
}

export default PopUpDim;