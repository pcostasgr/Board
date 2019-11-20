import React from 'react';
import ReactDOM from 'react-dom';

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}


class CardMenuList extends React.Component{
	constructor(props){
		super(props);
		this.onClickEvent=this.onClickEvent.bind(this);
		this.listValue="";
	}
        
	onClickEvent(e){
		var target = getEventTarget(window.event);
    		this.listValue=target.innerHTML;
    	    	this.props.callf(this.listValue) ;
	}
	
	componentDidMount(){
		var ul=ReactDOM.findDOMNode(this);
		ul.onclick = this.onClickEvent;
	}

	render(){
		return(
			
		<ul id="cardlist" className="card-menu-list" style={{ top:this.props.topValue,left:this.props.leftValue,visibility:this.props.visibility}}>
			  <li><a  href="#home">Home</a></li>
			  <li><a href="#news">News</a></li>
			  <li><a href="#contact">Contact</a></li>
			  <li><a href="#about">About</a></li>
		</ul>
	
		);
	}
}


export default CardMenuList;