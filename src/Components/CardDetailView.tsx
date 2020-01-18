import React from 'react';
import ReactDOM from 'react-dom';
import {deleteCard,selectCard,updateCard} from '../reducers/ListReducer';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {CardData} from '../Model/ListModel';
import { throwStatement } from '@babel/types';
import { isThisISOWeek } from 'date-fns';
import CardCheckListComp from './CardCheckListComp';

function getEventTarget(e:any) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

type CardDetailViewProps={
	cardData:CardData;
	selectedListId:number;
	selectedCardId:number;
	callf:(v:string)=>void;
	topValue:number;
	leftValue:number;
	visibility:"hidden" | "visible";
	deleteCardEvent:(listid:number,cardId:number)=>void;
	updateCardEvent:(card:CardData)=>void;
}


class CardDetailView extends React.Component<CardDetailViewProps>{
	listValue:string;
	cardTitle:string;

	constructor(props:CardDetailViewProps){
		super(props);
		this.onClickEvent=this.onClickEvent.bind(this);
		this.saveCardEvent=this.saveCardEvent.bind(this);
		this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
		this.handleDateChange=this.handleDateChange.bind(this);
		this.listValue="";
		this.cardTitle=this.props.cardData?this.props.cardData.title:" ";
		this.deleteCardEvent=this.deleteCardEvent.bind(this);
		this.closeControl=this.closeControl.bind(this);
	}
        
	onClickEvent(e:any){
		var target = getEventTarget(window.event);
    		this.listValue=target.innerHTML;
    	    	this.props.callf(this.listValue) ;
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

	saveCardEvent(){
		this.props.updateCardEvent({...this.props.cardData,title:this.cardTitle});
		this.closeControl();
	}

	handleDateChange=(date:any)=> {
		var month=date.getMonth();
		month+=1;
		var formatedDate=date.getFullYear() + "-" + month + "-" + date.getDate();
		if(this.props.cardData.cardDate===formatedDate) return;
		this.props.updateCardEvent({...this.props.cardData,cardDate:formatedDate});
	};
	
	handleTextFieldChange(e:any){
		console.log("handle:" + e.target.value);
		this.cardTitle=e.target.value;
	}

	render(){
		var dateField;
		var date_;

		if(this.props.cardData){
			if(this.props.cardData.cardDate!=null && this.props.visibility=='visible' ){

				dateField=<KeyboardDatePicker
					key={"datePickerPreviewCard"+this.props.cardData.id}
					disableToolbar
					variant="inline"
					margin="normal"
					id="date-picker-inline"
					format="dd/MM/yyyy"
					onChange={this.handleDateChange}
					autoOk={true}
					value={new Date(this.props.cardData.cardDate)}
					defaultValue={new Date(this.props.cardData.cardDate)}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
					InputProps={{
						disableUnderline: true,
					}}
				/>;  
				//dateField=null;
			}else{
				dateField=null;
			}
		}else{
			return null;
		}

		console.log("card title :" +this.props.cardData.title);
	
		return(

			<div id={"cardlist"+this.props.cardData.id} className="card-menu-list" 
			style={{ top:this.props.topValue,left:this.props.leftValue,
				visibility:this.props.visibility,
				width:800
				}}>
				<table>
					<colgroup>
					<col width="100%"></col>
					</colgroup>
					<tbody>
					<tr id="DetailTitleText" >
						<td>
							<TextField
								key={"TextFiledView"+this.props.cardData.id}
								id="popUpDimId"
								name="description_field"
								multiline rowsMax="10"
								defaultValue={this.props.cardData.title}
								onChange={this.handleTextFieldChange}
								//fullWidth={true}
							/>
						</td>
					</tr>
					</tbody>
				</table>

				<table>
					<colgroup>
				    <col width="80%"></col>
					<col width="20%"></col>
					</colgroup>
					<tbody>
					<tr id="DetailsMainRow">
						<td id="MainLeftPanel" >
							<table>
				            <tbody>
							<tr>
								<td>Labels</td>
								<td>
								{dateField}
								</td>
							</tr>
							<tr>
								<td>
									{/*<TextField
									id="ListNameTextId"
									label="Value"
									multiline rowsMax="1"
									defaultValue="New TextField"
									/>*/}

								<CardCheckListComp
				                    key={"ListComp1"}
				                    cardid={this.props.cardData.id}
								/>
								</td>
							</tr>
				        </tbody>
                        </table>
						</td>
						<td id="MainRightPanel" >
							<List component="nav" aria-label="Stack actions">
								<ListItem button>
								<ListItemText primary="Save card" onClick={this.saveCardEvent} />
								</ListItem>
								<ListItem button>
								<ListItemText primary="Delete card" onClick={this.deleteCardEvent} />
								</ListItem>
								<ListItem button>
								<ListItemText primary="Cancel" onClick={this.closeControl} />
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


const mapStateToProps = (state:any) => {
    return {
        cardData:state.listDisplay.cardData
    };
};

function mapDispatchToProps(dispatch:any) {
    return {
        deleteCardEvent: (listid:number,cardid:number) => {

            dispatch(deleteCard({listId:listid,cardId:cardid})
			)
		},
		updateCardEvent:(card:CardData)=>{
			dispatch(updateCard(card))
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailView);