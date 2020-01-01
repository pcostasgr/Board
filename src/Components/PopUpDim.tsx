import React from 'react';
import {connect} from 'react-redux';
import {addCard,deleteList} from './../reducers/ListReducer';

import TextField from '@material-ui/core/TextField';
import {setPopUpTextTitle} from '../reducers/PopUpReducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {KeyboardDatePicker} from '@material-ui/pickers';

type PopUpDimProps={
	initTextValue:string;	
	selectedListId:number;	
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
	createNewCardEvent:(listId:number,cardTitle:string)=>void;
	deleteListEvent:(listId:number)=>void;
    setPopUpTextTitleEvent:(value:string)=>void;
	callf:(v:string)=>void;
}


class PopUpDim extends React.Component<PopUpDimProps>{

	currentDate:Date;
	buttonClick_:()=>void;

	constructor(props:PopUpDimProps){
		super(props);
		this.buttonClick_=this.buttonClick.bind(this);	
		this.addNewCard=this.addNewCard.bind(this);
		this.deleteList=this.deleteList.bind(this);
		this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
		
		this.state={
			titleValue:this.props.initTextValue
		}
		this.currentDate=new Date();
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

	deleteList(){
		this.props.deleteListEvent(this.props.selectedListId);
		this.props.callf("");
	}

	handleTextFieldChange(e:any){
		console.log(e.target.value);
		this.props.setPopUpTextTitleEvent(e.target.value);
	}

	handleDateChange=(date:any)=> {
        //this.dateValue=date;
    };
	render(){

		return (	
			<div id="PopUpDimCard" className="popup-div" style={{ top:this.props.topValue,
			left:this.props.leftValue,visibility:this.props.visibility}}>
				<table>
					<colgroup>
					<col width="100%"></col>
					</colgroup>
					<tbody>
					<tr id="DetailTitleText" >
						<td>
							<TextField
								id="popUpDimId"
								label="Description"
								name="description_field"
								multiline rowsMax="10"
								value={this.props.initTextValue}
								//defaultValue={this.props.initTextValue}
								onChange={this.handleTextFieldChange}
								fullWidth={true}
							/>
						</td>
					</tr>
					</tbody>
				</table>

				<table>
					<colgroup>
				    <col width="70%"></col>
					<col width="30%"></col>
					</colgroup>
					<tbody>
					<tr id="DetailsMainRow">
						<td id="MainLeftPanel" >
							<table><tbody>
							<tr>
								<td>Labels</td>
								<td>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										margin="normal"
										id="date-picker-inline"
										value={new Date()}
										format="dd/MM/yyyy"
										onChange={this.handleDateChange}
										autoOk={true}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
										InputProps={{
											disableUnderline: true,
										}}
									/>    
								</td>
							</tr>
							
							<tr>
								<td>
									<TextField
									id="ListNameTextId"
									label="Value"
									multiline rowsMax="1"
									defaultValue="New TextField"
									/>
								</td>
							</tr>
                        </tbody></table>
						</td>
						<td id="MainRightPanel" >
							<List component="nav" aria-label="Stack actions">
								<ListItem button>
        						    <ListItemText primary="Save list Title" onClick={this.buttonClick_} />
        						</ListItem>
        						<ListItem button>
        						    <ListItemText primary="Add card" onClick={this.addNewCard} />
        						</ListItem>
								<ListItem button>
        						    <ListItemText primary="Delete list"  onClick={this.deleteList} />
        						</ListItem>
      						</List>
						</td>
					</tr>
				</tbody>
				</table>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch:any) {
    return {
        createNewCardEvent: (listId:number,cardTitle:string) => {
            dispatch(addCard({
				listId:listId
				,cardid:-1
				,cardTitle:cardTitle
			})
			)
		},
		setPopUpTextTitleEvent:(value:string) =>{
            dispatch(setPopUpTextTitle(value))
		},
		deleteListEvent:(listId:number)=>{
			dispatch(deleteList(listId))
		}
	}
};

const mapStateToProps = (state:any) => {
    return {
        initTextValue:state.popUpDisplay
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpDim);
