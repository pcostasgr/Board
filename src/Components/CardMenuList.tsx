import React from 'react';
import ReactDOM from 'react-dom';
import {deleteCard} from './../reducers/ListReducer';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';

function getEventTarget(e:any) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

type CardMenuListProps={
	selectedListId:number;
	selectedCardId:number;
	callf:(v:string)=>void;
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
	deleteCardEvent:(listid:number,cardId:number)=>void;
}

class CardMenuList extends React.Component<CardMenuListProps>{
	listValue:string;
	constructor(props:CardMenuListProps){
		super(props);
		this.onClickEvent=this.onClickEvent.bind(this);
		this.listValue="";
		this.deleteCardEvent=this.deleteCardEvent.bind(this);
		this.closeControl=this.closeControl.bind(this);
	}
        
	onClickEvent(e:any){
		var target = getEventTarget(window.event);
    		this.listValue=target.innerHTML;
    	    	this.props.callf(this.listValue) ;
	}
	
	componentDidMount(){
		//var ul:any=ReactDOM.findDOMNode(this);
		//ul.onclick = this.onClickEvent;
	}

	
	closeControl(){
		var target = getEventTarget(window.event);
    		this.listValue=target.innerHTML;
    	    	this.props.callf(this.listValue) ;
	}
	deleteCardEvent(){
			this.props
            .deleteCardEvent(
			this.props.selectedListId,
			this.props.selectedCardId)
            this.closeControl();
	}

	handleDateChange(){

	}

	handleTextFieldChange(){

	}

	render(){
		return(
			<div id="cardlist" className="card-menu-list" 
			style={{ top:this.props.topValue,left:this.props.leftValue,
				visibility:this.props.visibility}}>
				<table>
					<col width="100%"></col>
					<tr id="DetailTitleText" >
						<td>
							<TextField
								id="popUpDimId"
								label="Description"
								name="description_field"
								multiline rowsMax="10"
								onChange={this.handleTextFieldChange}
								fullWidth={true}
							/>
						</td>
					</tr>
				</table>

				<table>
				    <col width="70%"></col>
					<col width="30%"></col>
					<tr id="DetailsMainRow">
						<td id="MainLeftPanel" >
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
						</td>
						<td id="MainRightPanel" >
							<List component="nav" aria-label="Stack actions">
								<ListItem button>
								<ListItemText primary="Delete card" onClick={this.deleteCardEvent} />
								</ListItem>
								<ListItem button>
								<ListItemText primary="Cancel" onClick={this.closeControl} />
								</ListItem>
      						</List>
						</td>
					</tr>
					</table>

			</div>
		);
	}
}

function mapDispatchToProps(dispatch:any) {
    return {
        deleteCardEvent: (listid:number,cardid:number) => {

			console.log("listid:" + listid + " deleteCardEvent:" + cardid)
            dispatch(deleteCard({listId:listid,cardId:cardid})
			)
		},
	}
};

export default connect(null, mapDispatchToProps)(CardMenuList);