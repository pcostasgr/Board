import React from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {CardData} from '../Model/ListModel';
import CardCheckListComp from './CardCheckListComp';
import {boardFacade} from '../store/Repository'

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
		this.cardTitle=this.props.cardData?this.props.cardData.cardtitle:" ";
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
		this.props.updateCardEvent({...this.props.cardData,cardtitle:this.cardTitle});
		this.closeControl();
	}

	handleDateChange=(date:any)=> {
		var month=date.getMonth();
		month+=1;
		var formatedDate=date.getFullYear() + "-" + month + "-" + date.getDate();
		if(this.props.cardData.carddate===formatedDate) return;
		this.props.updateCardEvent({...this.props.cardData,carddate:formatedDate});
	};
	
	handleTextFieldChange(e:any){
		console.log("handle:" + e.target.value);
		this.cardTitle=e.target.value;
	}

	render(){
		var dateField;
		var date_;

		if(this.props.cardData){
			if(this.props.cardData.carddate!=null && this.props.visibility=='visible' ){

				dateField=<KeyboardDatePicker
					key={"datePickerPreviewCard"+this.props.cardData.cardid}
					disableToolbar
					variant="inline"
					margin="normal"
					id="date-picker-inline"
					format="dd/MM/yyyy"
					onChange={this.handleDateChange}
					autoOk={true}
					fullWidth={false}
					value={new Date(this.props.cardData.carddate)}
					defaultValue={new Date(this.props.cardData.carddate)}
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

		console.log("card title :" +this.props.cardData.cardtitle);
	
		return(

			<div id={"cardlist"+this.props.cardData.cardid} className="card-menu-list" 
			style={{ top:this.props.topValue,left:this.props.leftValue,
				visibility:this.props.visibility,
				width:600
				}}>
								<table>
					<colgroup>
				    <col width="75%"></col>
					<col width="25%"></col>
					</colgroup>
					<tbody>
					<tr id="DetailsMainRow">
						<td id="MainLeftPanel" >
							<table>
				            <tbody>
							<td>
								<TextField
									key={"TextFiledView"+this.props.cardData.cardid}
									id="popUpDimId"
									name="description_field"
									multiline rowsMax="10"
									fullWidth={true}
									defaultValue={this.props.cardData.cardtitle}
									onChange={this.handleTextFieldChange}
								/>
							</td>

						    <tr>
								{dateField}
				            </tr>
							<tr>
								<td>Lists</td>
							</tr>
							<tr>
								<td>
								<CardCheckListComp
				                    key={"ListComp1"}
				                    cardid={this.props.cardData.cardid}
								/>
								</td>
							</tr>
				        </tbody>
                        </table>
						</td>
						<td valign="top">
								<List component="nav" aria-label="Stack actions">
									<ListItem button>
									<ListItemText primary="Close" onClick={this.saveCardEvent} />
									</ListItem>
									<ListItem button>
									<ListItemText primary="Delete card" onClick={this.deleteCardEvent} />
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

			dispatch(boardFacade.cardApi.deleteCardApi(listid,cardid))
		},
		updateCardEvent:(card:CardData)=>{
			dispatch(boardFacade.cardApi.updateCardApi(card))
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailView);