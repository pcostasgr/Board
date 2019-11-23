import React from 'react';

type PopUpDimProps={	
	callf:(v:string)=>void;
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
}

class PopUpDim extends React.Component<PopUpDimProps>{

	textInput:any;
	buttonClick_:()=>void;
	constructor(props:PopUpDimProps){
		super(props);
		this.buttonClick_=this.buttonClick.bind(this);	
		this.textInput=React.createRef();
	}
	
	buttonClick(){
		this.props.callf(this.textInput.current.value);
	}
		
	render(){
		return (	
			<div id="PopUpDim" className="popup-div" style={{ top:this.props.topValue,
			left:this.props.leftValue,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick_} >click me</button><br></br>
				Value:<input type="text" name="description_field"
				ref={this.textInput}
				  />
			</div>
		);
	}
}

export default PopUpDim;