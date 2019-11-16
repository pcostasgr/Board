import React from 'react';
import ReactDOM from 'react-dom';
import './../cardlist.css';
 
//import injectTapEventPlugin from 'react-tap-event-plugin';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker  from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

import {getComponentDb} from './../mockdb';
//injectTapEventPlugin();


class CardLayer2 extends React.Component {
  constructor(props){
  	super(props);
  }

  render(){
	
 	var dateValue=this.props.dateValue;
	var listCompleteCount=this.props.listCompleteCount;
	var listTotalCount=this.props.listTotalCount;
	var isVisible=this.props.visible;
	
	if(listTotalCount==0 && dateValue==0){
		return null;	
	}

	if(isVisible!="true"){
		return null;
	}
 	
	if(!listCompleteCount){
		listCompleteCount=0;
	}

	var list=[];
	
	var dateValue_;
	if(dateValue!=0){
		dateValue_=new Date(dateValue);
		list.push(<td style={{align:"left"}}>  <DatePicker hintText="Portrait Dialog" defaultDate={dateValue_} container="inline" autoOk="true" />  </td>);
	}

	if(listTotalCount>0){				
		list.push(<td style={{align:"right"}} > <b> {listCompleteCount}/{listTotalCount}</b> </td> );
	}

	return (
		<div>
			<table style={{width:"100%"}} >
			<tbody>
			<tr>
			{list}
			</tr></tbody></table>
		</div>
        );
  }	
};

function getColorLabelData(){
	return { columnNo:4,data:[
			{rows:[{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10}]},
			{rows:[{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10},
				{color:"#9c0000",width:50,height:10}]},
			{rows:[{color:"#9c0000",width:50,height:10}]}
			]
		};
}


class CardColorLabelRow extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var colNo=this.props.data.rows.length;
		var data=this.props.data.rows;
		var list=[];
		var column={};
		var id_="";
		for(var c=0;c<colNo;c++){
			column=data[c];
			id_="ccrlr"+c
			list.push(
			<td key={id_}>
				<div key={id_} style={{backgroundColor:column.color, width:column.width, height:column.height }} />
			</td>
			);
		}
		return(
			<tr>{list}</tr>	    	
		);
	}
};

class CardColorLabelRows extends React.Component{i
	constructor(props){
		super(props);
	}

	render(){
		var rowsData=this.props.labelItems;
		var rowsNo=rowsData.length;
		var list=[];


		{/*var json_={columns:[]} ;
		json_.columns.push({color:"#9c0000",width:60,height:10});*/}

		var jsonRow={};
		for(var i=0;i<rowsNo;i++){
			jsonRow=rowsData[i];
			list.push( <CardColorLabelRow key={i}  data= {jsonRow}  /> );
		}	
	
		return (
			<tbody>
			{list}
			</tbody>		
		);
	}
};

class CardColorLabels extends React.Component{
	constructor(props){
		super(props);
		this.onMouseOver=this.onMouseOver.bind(this);
		this.state={
			buttonVisible:"hidden",
			rowsVisible:"visible"
		};

	}
	
	onMouseOver(){
		 {/*alert('Mouse Over Event'); */}
		 var isvisible=(this.state.buttonVisible==="hidden")?"visible":"hidden";
		 this.setState({
			buttonVisible:isvisible
		});
	}
	
	render(){
		
		if(this.props.rowCount==0){
			return null;
		}

		var jsonData=getColorLabelData();
	        var labelItems=this.props.labelItems;
	
		if(labelItems==null){			
			return null;
		}

		if(labelItems.length==0){
			return null;
		}
		

		return (
			<table style={{width:"inherit" }} >
				<tbody>	
					<tr>
						<th>
							< table style={{width:"inherit"}} onMouseOver={this.onMouseOver} >
							< CardColorLabelRows labelItems={labelItems} />
							</table>
						</th>
					</tr>
				</tbody>
			</table>
		);
	}
}


class CardComponent extends React.Component{
	constructor(props){
		super(props);
		this.onMouseOver=this.onMouseOver.bind(this);
		this.onMouseOut=this.onMouseOut.bind(this);
		this.onCardMenuEvent=this.onCardMenuEvent.bind(this);
		this.onButtonClick=this.onButtonClick.bind(this);
		this.state={editButtonVisible:"hidden",name:"CardComponent"};
		this.name="CardComponent";
	}
	
	onButtonClick(){
		var component=ReactDOM.findDOMNode(this);
		var rect = component.getBoundingClientRect();
		var offsetWidth=component.offsetWidth;
		var menuPos={topValue:rect.top,leftValue:rect.left+offsetWidth};

		this.props.menuEvent(menuPos,this);

	}
	
	onCardMenuEvent(e){
	}

	onMouseOver(){
		{/*alert('Test OnMousOver')*/}
		 this.setState({
			editButtonVisible:"visible"
		});
	}

	onMouseOut(){
		{/*alert('Test OnMousOver')*/}
		 this.setState({
			editButtonVisible:"hidden"
		});

	}


	render(){
		var component_id=this.props.comid;
		console.log("Card Component render " + component_id);
		
		var cardDate=this.props.cardDate;

		return (			

			<div  className="card" style={{position:"relative",width:this.props.width }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
				<button className="flat_button_z" style={{visibility:this.state.editButtonVisible }} onClick={this.onButtonClick} >...</button>
				<CardColorLabels rowCount={this.props.rowCount} labelItems={this.props.labelItems} />
				<TextField id={"textField"+this.props.comid} style={{width:"inherit"}} multiLine={true} rows={1} defaultValue={this.props.description} />
				<CardLayer2 dateValue={cardDate} listTotalCount={this.props.listCount} visible={this.props.cardIsVisible} />
				<div className="bottom-card-section" ></div>
			</div>
		);
	}
}

class CardListContainer extends React.Component{

	constructor(props){
		super(props);
		this.flatButtonClick=this.flatButtonClick.bind(this);
		this.onListTitleChange=this.onListTitleChange.bind(this);
		this.state={listTitle:this.props.listTitle};
		this.name="CardListContainer";
	}
		

        componentDidMount(){
	}

	onListTitleChange(title){
		this.setState({listTitle:title});
	}

	testReactDom(){
		var component=ReactDOM.findDOMNode(this);
		var rect = component.getBoundingClientRect();
		console.log(rect.top, rect.right, rect.bottom, rect.left);
		alert("rect:"+rect.top+" "+rect.right+" "+rect.left);
	}


        flatButtonClick(){
		var component=ReactDOM.findDOMNode(this);
		var rect = component.getBoundingClientRect();
		var offsetWidth=component.offsetWidth;
		var menuPos={topValue:rect.top,leftValue:rect.left+offsetWidth};

		this.props.menuEvent(menuPos,this);
		console.log("test test test flat button");
	}
	
	render(){
		var listCount=0;
		var cardData=this.props.data.cardData.map(function(e){
			return <CardComponent comid={e.id} compBackColor="#ffffff" className="flag_button_z"  
			listCount={e.listItems.length} width='300'  rowCount="1" cardIsVisible="true" 
			description={e.title} cardDate={e.cardDate} listItems={e.listItems} labelItems={e.labelItems} 
			 menuEvent={this.props.menuEvent}	
		 />;
		},this);
		
		console.log('card-data:' + this.props.data.cardData[0].id);
		

		return (
			<div  className="simple-header" style={{width:320 }} >
				<table style={{width:"100%"}}><tbody>
					<tr>
						<td>
							<table style={{width:"100%",height:30}}><tbody>
								<tr>
									 <td className="simple-header" > <b>{this.state.listTitle }</b> </td> 
									<td style={{align:"right",width:30}}> 
										<button className="flat_button" onClick={this.flatButtonClick} >...</button> 
									</td>
								</tr>
							</tbody></table>
						</td>

					</tr>
					<tr>
						<td>	
							<div  className="card-container" >
							{cardData}
							</div>
						</td><td style={{width:30}}></td>
					</tr>	
				</tbody></table>
			</div>

		);
	}
}

//CardListContainer.propTypes = {
  //menuEvent: React.PropTypes.func.isRequired,
//};

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

class PopUpDim extends React.Component{
	constructor(props){
		super(props);
		this.buttonClick=this.buttonClick.bind(this);	
		this.state={textbox:"",name:"test"};	
	}
       	
	buttonClick(){
		console.log("div button click");

		this.props.callf(this.input.value);
	}
		
	render(){
		return (	
			<div name="PopUpDim" className="popup-div" style={{ top:this.props.topValue,left:this.props.leftValue,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick} >click me</button><br></br>
				Value:<input type="text" name="description_field" ref={(input)=>{this.input=input;} }  />
			</div>
		);
	}
}

class CardBoard extends React.Component{
	constructor(props){
		super(props);
		this.disableContainer=this.disableContainer.bind(this);
		this.enableContainer=this.enableContainer.bind(this);

		this.state={
			divPointerEvent:"all"
			,opacity:1
			,editMenuVisibility:"hidden"
			,menuTopValue:100
			,menuLeftValue:100
			,cardListTitle:"",
			cardMenuVisibility:"hidden"};
	}
	
	disableContainer(rect,componentRef){
		
		this.listContainer=componentRef;
		
		if(this.listContainer.name.localeCompare("CardListContainer")==0){
			 this.setState({
				divPointerEvent:"none"
				,opacity:0.4
				,editMenuVisibility:"visible"
				,menuTopValue:rect.topValue
				,menuLeftValue:rect.leftValue
			});

		}	
		
		if(this.listContainer.name.localeCompare("CardComponent")==0){
			
			 this.setState({
				divPointerEvent:"none"
				,opacity:0.4
				,cardMenuVisibility:"visible"
				,menuTopValue:rect.topValue
				,menuLeftValue:rect.leftValue
			});
		}

	

	}
	
	enableContainer(e){
		 this.setState({
			divPointerEvent:"all"
			,opacity:1
			,editMenuVisibility:"hidden"
			,cardMenuVisibility:"hidden"
		});

	        if(this.listContainer.name.localeCompare("CardListContainer")==0){
			this.listContainer.onListTitleChange(e);
		}	
		
		if(this.listContainer.name.localeCompare("CardComponent")==0){
			this.listContainer.onCardMenuEvent(e);
		}

	}
	
		
	render(){
		var g__=getComponentDb();
		
		
		var listData=g__.lists.map(function(e){
			return 	<td id={"tdlist" + e.listItem} className="board-table-cell">
				
				<div className="card-list-head" >
					<MuiThemeProvider>
						<CardListContainer listTitle={e.listTitle} menuEvent={this.disableContainer} data={e} popup={this.popup}/>
					</MuiThemeProvider>

				</div>

			</td>

		},this);
		
		var callbackf_=this.callbackFunc;
                var topValue=100;
		var leftValue=50;
		return (
			<div className="list-header" >
				<CardMenuList visibility={this.state.cardMenuVisibility} callf={this.enableContainer}
					topValue={this.state.menuTopValue} 
					leftValue={this.state.menuLeftValue}   />

				<PopUpDim callf={this.enableContainer} visibility={this.state.editMenuVisibility} topValue={this.state.menuTopValue} leftValue={this.state.menuLeftValue} 
				ref={(popup)=>{this.popup=popup;}} />				 
				<div>	
				<table className="board-header-table" style={{pointerEvents:this.state.divPointerEvent
				,opacity:this.state.opacity}}><tbody>
					<tr>
					{listData}
					</tr>
				</tbody></table>

				</div>

			</div>
		);
	}
}


export default CardBoard;

