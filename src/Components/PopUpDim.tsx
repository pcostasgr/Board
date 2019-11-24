import React from 'react';
import {connect} from 'react-redux';
import {addCard} from './../reducers/ListReducer';
import TextField from 'material-ui/TextField';
import classes from '*.module.css';

type PopUpDimProps={
	initTextValue:string;	
	callf:(v:string)=>void;
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
	createNewCardEvent:()=>void;
}

type PopUpDimState={
	titleValue:string
}

class PopUpDim extends React.Component<PopUpDimProps,PopUpDimState>{

	buttonClick_:()=>void;

	constructor(props:PopUpDimProps){
		super(props);
		this.buttonClick_=this.buttonClick.bind(this);	
		this.addNewCard=this.addNewCard.bind(this);
		this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
		console.log("Init Text Value:" + this.props.initTextValue);
		this.state={
			titleValue:this.props.initTextValue
		}
		
	}

	buttonClick(){
		console.log(this.state.titleValue);
		this.props.callf(this.state.titleValue);
	}
	
	addNewCard(){
		this.props.createNewCardEvent();
	}

	handleTextFieldChange(e:any){
		this.setState({titleValue:e.target.value});
	}
	render(){
		return (	
			<div id="PopUpDim" className="popup-div" style={{ top:this.props.topValue,
			left:this.props.leftValue,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick_} >Accept</button><br></br>

				  Value:<TextField
					id={"textField"}
					name="description_field"
                    style={{
						color:"#FFFFFF"
					}}
                    multiLine={true}
                    rows={1}
					defaultValue={this.props.initTextValue}
					value={this.state.titleValue}
					onChange={this.handleTextFieldChange}
					/>

				<button onClick={this.addNewCard}  >Add Card</button>/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch:any) {
    return {
        createNewCardEvent: () => {
            dispatch(addCard({
				listId:1,cardTitle:'Brand New List'
			})
			)
		}
	}
};

export default connect(null, mapDispatchToProps)(PopUpDim);
