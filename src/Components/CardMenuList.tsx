import React from 'react';
import ReactDOM from 'react-dom';
import {deleteCard} from './../reducers/ListReducer';
import {connect} from 'react-redux';


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
	}
        
	onClickEvent(e:any){
		var target = getEventTarget(window.event);
    		this.listValue=target.innerHTML;
    	    	this.props.callf(this.listValue) ;
	}
	
	componentDidMount(){
		var ul:any=ReactDOM.findDOMNode(this);
		ul.onclick = this.onClickEvent;
	}

	render(){
		return(
			<div id="cardlist" className="card-menu-list" 
			style={{ top:this.props.topValue,left:this.props.leftValue,
				visibility:this.props.visibility}}>
				<button
					id="deleteCardButton"
                    onClick={() => {
                   this
                        .props
                        .deleteCardEvent(
							this.props.selectedListId,
							this.props.selectedCardId)
                }}
				>Delete Card
				</button>
				<ul >
					<li><a href="#Delete List" >Delete List</a></li>
					<li><a href="#news">News</a></li>
					<li><a href="#contact">Contact</a></li>
					<li><a href="#about">About</a></li>
				</ul>
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