import React from 'react';
import {connect} from 'react-redux';
import {addCard} from './../reducers/ListReducer';
import TextField from '@material-ui/core/TextField';
import {setPopUpTextTitle} from '../reducers/PopUpReducer';

type PopUpDimProps={
	initTextValue:string;	
	selectedListId:number;	
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
	createNewCardEvent:(listId:number,cardTitle:string)=>void;
    setPopUpTextTitleEvent:(value:string)=>void;
	callf:(v:string)=>void;
}


class PopUpDim extends React.Component<PopUpDimProps>{


	buttonClick_:()=>void;

	constructor(props:PopUpDimProps){
		super(props);
		this.buttonClick_=this.buttonClick.bind(this);	
		this.addNewCard=this.addNewCard.bind(this);
		this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
		
		this.state={
			titleValue:this.props.initTextValue
		}

	}


	buttonClick(){
		this.props.callf(this.props.initTextValue);
	}
	
	addNewCard(){
		this.props.createNewCardEvent(
			this.props.selectedListId,
			"New Card"
		);
		this.props.callf(this.props.initTextValue);
	}

	handleTextFieldChange(e:any){
		this.props.setPopUpTextTitleEvent(e.target.value);
	}

	render(){

		return (	
			<div id="PopUpDimCard" className="popup-div" style={{ top:this.props.topValue,
			left:this.props.leftValue,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick_} >Accept</button><br></br>

				<TextField
					id="popUpDimId"
					label="Value"
					name="description_field"
					multiline rowsMax="1"
					value={this.props.initTextValue}
					defaultValue={this.props.initTextValue}
					onChange={this.handleTextFieldChange}
					/>
				<button onClick={this.addNewCard}> Add Card</button>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch:any) {
    return {
        createNewCardEvent: (listId:number,cardTitle:string) => {
            dispatch(addCard({
				listId:listId
				,cardTitle:cardTitle
			})
			)
		},
		setPopUpTextTitleEvent:(value:string) =>{
            dispatch(setPopUpTextTitle(value))
		}
	}
};

const mapStateToProps = (state:any) => {
    return {
        initTextValue:state.popUpDisplay
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpDim);
