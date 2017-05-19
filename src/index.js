import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Greeding,doSomething} from './App'
import './cardlist.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker  from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

import {getComponentDb} from './mockdb'

injectTapEventPlugin();


var CardLayer2=React.createClass({
  render:function(){
	
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
});

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
		this.state={editButtonVisible:"hidden"};

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
		console.log("render " + component_id);
		
		var cardDate=this.props.cardDate;

		return (			

			<div  className="card" style={{position:"relative",width:this.props.width }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
				<button className="flat_button_z" style={{visibility:this.state.editButtonVisible }} >...</button>
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
	}
	
        flatButtonClick(){
		this.props.callf(1);
		console.log("test test test flat button");
	}

	render(){
		var listCount=0;
		var cardData=this.props.data.cardData.map(function(e){
			return <CardComponent comid={e.id} compBackColor="#ffffff" className="flag_button_z"  
			listCount={e.listItems.length} width='300'  rowCount="1" cardIsVisible="true" 
			description={e.title} cardDate={e.cardDate} listItems={e.listItems} labelItems={e.labelItems} />;
		});
		
		console.log('card-data:' + this.props.data.cardData[0].id);
	
		return (
			<div className="simple-header" style={{width:320 }} >
				<table style={{width:"100%"}}><tbody>
					<tr>
						<td>
							<table style={{width:"100%",height:30}}><tbody>
								<tr>
									 <td className="simple-header" > <b>{this.props.listTitle }</b> </td> 
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

CardListContainer.propTypes = {
  callf: React.PropTypes.func.isRequired,
};


class CardListComponent extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
		<div className="card-list-head" >
			<MuiThemeProvider>
				<CardListContainer listTitle={this.props.listTitle} callf={this.props.callf} data={this.props.data} />
			</MuiThemeProvider>

		</div>

		);	
	}
}

class PopUpDim extends React.Component{
	constructor(props){
		super(props);
		this.buttonClick=this.buttonClick.bind(this);		
	}
	
	buttonClick(){
		console.log("div button click");
		this.props.callf();
	}
		
	render(){
		return (	
			<div className="popup-div" style={{ top:100,left:50,visibility:this.props.visibility}}>
				<button onClick={this.buttonClick} >click me</button>
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
			,editMenuVisibility:"hidden"};
	}
	
	disableContainer(e){
		 this.setState({
			divPointerEvent:"none"
			,opacity:0.4
			,editMenuVisibility:"visible"
		});
	}

	enableContainer(){
		 this.setState({
			divPointerEvent:"all"
			,opacity:1
			,editMenuVisibility:"hidden"
		});
		alert('enable');
	}

	render(){
		var g__=getComponentDb();
		
		var listData=g__.lists.map(function(e){
			return 	<td id={"tdlist" + e.listItem} className="board-table-cell">
				<CardListComponent listTitle={e.listTitle} callf={this.disableContainer} data={e} />				
			</td>

		},this);
		
		var callbackf_=this.callbackFunc;
		return (
			<div className="list-header" >
				<div>	
				<table className="board-header-table" style={{pointerEvents:this.state.divPointerEvent
				,opacity:this.state.opacity}}><tbody>
					<tr>
					{listData}
					</tr>
				</tbody></table>
				</div>
				<PopUpDim callf={this.enableContainer} visibility={this.state.editMenuVisibility} />				 
			</div>
		);
	}
}




/*This is a commecnt functions rendered as func() */
ReactDOM.render(
	<CardBoard/>,
	document.getElementById('root')

);

