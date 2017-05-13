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

injectTapEventPlugin();

const CardDescription = () => (
	
	<TextField style={{width:"inherit"}}
	      multiLine={true}
	      rows={2}
	      style={{backgroundColor:"#ffffff" }}

	    />
);

var CardLayer2=React.createClass({
  render:function(){
	
 	var dateValue=this.props.dateValue;
	var listCompleteCount=this.props.listCompleteCount;
	var listTotalCount=this.props.listTotalCount;
	var isVisible=this.props.visible;
	
	if(listTotalCount==0 && dateValue==null){
		return null;	
	}

	if(isVisible!="true"){
		return null;
	}
 	
	if(!listCompleteCount){
		listCompleteCount=0;
	}

	var list=[];
	
	var date_=new Date();
	if(dateValue!=null){
		list.push(<td style={{align:"left"}}>  <DatePicker hintText="Portrait Dialog" defaultDate={dateValue} container="inline" autoOk="true" />  </td>);
	}

	if(listTotalCount>0){
		list.push(<td style={{align:"right"}} > <b> {listCompleteCount}/{listTotalCount}</b> </td> );
	}

	return (
		<div>
			<table style={{width:"100%"}} ><tr>
			{list}
			</tr></table>
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
		for(var c=0;c<colNo;c++){
			column=data[c];
			list.push(
			<td>
				<div style={{backgroundColor:column.color, width:column.width, height:column.height }} />
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
		var rowsData=this.props.data;
		var rowsNo=rowsData.data.length;
		var list=[];


		{/*var json_={columns:[]} ;
		json_.columns.push({color:"#9c0000",width:60,height:10});*/}

		var jsonRow={};
		for(var i=0;i<rowsNo;i++){
			jsonRow=rowsData.data[i];
			list.push( <CardColorLabelRow  data= {jsonRow}  /> );
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
	

	debug_render(){
	}
	
	
	render(){
		
		if(this.props.rowCount==0){
			return null;
		}

		var jsonData=getColorLabelData();
		
		if(jsonData==null){			
			return null;
		}

		if(jsonData.data.length==0){
			return null;
		}
		

		return (
			<table style={{width:"inherit" }} >
				<tbody>	
					<tr>
						<th>
							< table style={{width:"inherit"}} onMouseOver={this.onMouseOver} >
							< CardColorLabelRows data={jsonData} />
							</table>
						</th>

						{/*<th style={{align:"right",width:30}}> <button className="flat_button" style={{visibility:this.state.buttonVisible}}  >...</button> 
						</th>*/}
					</tr>
				</tbody>
			</table>
		);
	}
}

var someJson={value1:10 , value2:20};

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
		return (			
			<div  className="card" style={{position:"relative",width:this.props.width }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
				<button className="flat_button_z" style={{visibility:this.state.editButtonVisible }} >...</button>
				<CardColorLabels rowCount={this.props.rowCount} />
				<TextField style={{width:"inherit"}} multiLine={true} rows={2} />
				<CardLayer2 dateValue={new Date()} listTotalCount={this.props.listCount} visible={this.props.card2Visible} />
				<div className="bottom-card-section" ></div>
			</div>
		);
	}
}

class CardListContainer extends React.Component{

	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div className="simple-header" style={{width:320 }} >
				<div style={{width:320,height:30}}>
				<table className="simple-header" style={{width:"100%",height:30}}>
					<tr>
						 <td className="simple-header" style={{ width:310}}> <b>{this.props.cardTitle }</b> </td> 
						<td style={{align:"right",width:30}}> <button className="flat_button"  >...</button> </td>
					</tr>	
				</table>
				</div>
				<div  className="card-container" style={{width:320}} >
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1" width="300"  rowCount="1" card2Visible="true" />
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="0" card2Visible="true"/>
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="3"/>
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="0" cardVisible="true "/>
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="1" cardVisible="true"/>
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="1"/>
					<CardComponent compBackColor="#ffffff" className="flag_button_z"  listCount="1"  width="300" rowCount="0"/>
				</div>
			</div>

		);
	}
}

class CardListComponent extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
		<div className="card-list-head" >
			<MuiThemeProvider>
				<CardListContainer cardTitle="This is a title 3"  />
			</MuiThemeProvider>

		</div>

		);	
	}
}

class CardBoard extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<table className="board-header-table">
					<tr>
						<td className="board-table-cell">
							<CardListComponent/>						
						</td>
						<td sclassName="board-table-cell">
							<CardListComponent/>
						</td>


					</tr>
				</table>
			</div>
		);
	}
}

/*This is a commecnt functions rendered as func() */
ReactDOM.render(
	<CardBoard/>,
	document.getElementById('root')

);

