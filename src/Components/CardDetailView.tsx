import React from 'react';
import ReactDOM from 'react-dom';
import {deleteCard,selectCard,updateCard} from '../reducers/ListReducer';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {CardData} from '../model/ListModel';
import { throwStatement } from '@babel/types';

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

type CardDetailViewState={
	cardData:CardData
}

class CardDetailView extends React.Component<CardDetailViewProps,CardDetailViewState>{
	listValue:string;
	constructor(props:CardDetailViewProps){
		super(props);
		this.onClickEvent=this.onClickEvent.bind(this);
		this.listValue="";
		this.deleteCardEvent=this.deleteCardEvent.bind(this);
		this.closeControl=this.closeControl.bind(this);

		this.state={cardData:this.props.cardData};
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

	handleDateChange=(date:any)=> {
		var month=date.getMonth();
		month+=1;
		var formatedDate=date.getFullYear() + "-" + month + "-" + date.getDate();
		//this.setState({cardData:{...this.state.cardData,cardDate:formatedDate}});
		
		console.log("handle:" +formatedDate) ;
		this.props.updateCardEvent(
			{
					...this.props.cardData,cardDate:formatedDate
			}
		);


	};
	
	handleTextFieldChange(e:any){
        //this.setState({cardData:{...this.state.cardData,title:e.target.value}});
	}

	render(){
		var dateField;
		var date_;
		if(this.state.cardData.cardDate!=null){
			date_=new Date(this.state.cardData.cardDate);
		}else{
			date_=new Date();
		}
	
		console.log("input date:" + this.state.cardData.cardDate);
		if(this.props.cardData.cardDate!=null){

			dateField=<KeyboardDatePicker
				disableToolbar
				variant="inline"
				margin="normal"
				id="date-picker-inline"
				format="dd/MM/yyyy"
				onChange={this.handleDateChange}
				autoOk={true}
				value={this.props.cardData.cardDate}
				defaultValue={new Date(this.props.cardData.cardDate)}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
				InputProps={{
					disableUnderline: true,
				}}
			/>    
		}else{
			dateField=null;
		}

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
								name="description_field"
								multiline rowsMax="10"
								defaultValue={this.props.cardData.title}
								//onChange={this.handleTextFieldChange}
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
								{dateField}
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


const mapStateToProps = (state:any) => {
    return {
        cardData:state.listDisplay.cardData
    };
};

function mapDispatchToProps(dispatch:any) {
    return {
        deleteCardEvent: (listid:number,cardid:number) => {

			console.log("listid:" + listid + " deleteCardEvent:" + cardid)
            dispatch(deleteCard({listId:listid,cardId:cardid})
			)
		},
		updateCardEvent:(card:CardData)=>{
			dispatch(updateCard(card))
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailView);