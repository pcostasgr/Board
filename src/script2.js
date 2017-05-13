
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Greeding,doSomething} from './App'
import './index.css';
import './cardlist.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import DatePicker  from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

const user={
	firstName:'Costas',
	lastName:'Papadopoulos'

};


class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state={ date: new Date()};
	}
	
	componentDidMount(){
		this.timerID=setInterval( ()=>this.tick(),1000);
	}
	
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	
	tick(){
		this.setState({date: new Date()});
	}

	render(){
		return (
			<div>
				<hl>Hello, world!</hl>
			        <hl><br></br> It is {this.state.date.toLocaleTimeString()}.</hl>			
			</div>
		);
	}
}	

function formatName(user){
	return user.firstName+ ' ' + user.lastName;
}


const element=(
	<div>
		<hl>
			React Test
		</hl>
		<hl>
			Hello, {formatName(user)} World !
		</hl>
	</div>
)
;




function listTest(){
	var limit=10;
	var list=[];
	for(var j=0;j<limit;j++){
		list.push(<li key={j.toString()}>  value {j} </li> );
	}

	return (
		<div>
		<ul>
			{list}
		</ul>
		</div>
	);
}

const CardDescription = () => (
	
	<TextField
	      multiLine={true}
	      rows={2}
	      style={{backgroundColor:"#ffffff" }}

	    />
);

var CardLayer2=React.createClass({
  render:function(){
        var dateValue=null;
        var listCompleteCount=0;
	var listTotalCount=0;

 	dateValue=this.props.dateValue;
	listCompleteCount=this.props.listCompleteCount;
	listTotalCount=this.props.listTotalCount;

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
			{rows:[{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10}]},
			{rows:[{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10},
				{color:"#9c0000",width:60,height:10}]},
			{rows:[{color:"#9c0000",width:60,height:10}]}
			]
		};
}

function getColorLabelData2(){
	return null;
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
		this.state={buttonVisible:"hidden"};
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
		var jsonData=getColorLabelData();
		
		if(jsonData==null){			
			return null;
		}

		if(jsonData.data.length==0){
			return null;
		}

		return (
			<table style={{width:300}}>
				<tbody>	
					<tr>
						<th>
							< table style={{width: 300},{backgroundColor:"#ffffff"}} onMouseOver={this.onMouseOver} >
								{/*<tbody>
									<tr>
									    <th><div style={{backgroundColor: '#9c0000', width: 60, height: 10}} /></th>
									    <th><div style={{backgroundColor: '#9c0000', width: 60, height: 10}} /></th>
									    <th><div style={{backgroundColor: '#9c0000', width: 60, height: 10}} /></th>
									    <th><div style={{backgroundColor: '#9c0000', width: 60, height: 10}} /></th>
								</tbody>*/}
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

const cardListStyle={
	paddingRight:20
	,paddingLeft:20
	,width:300
        ,backgroundColor:"#ccffff"

};

var someJson={value1:10 , value2:20};

function cardMouseOver(t){
	alert('HIIIIIi');
}

class CardComponent extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (			
			<div  style={{backgroundColor:this.props.compBackColor,position:"relative"}} >
				<button className="flat_button_z" style={{visibility:this.props.editButtonVisible }} >...</button>
				<CardColorLabels />
				<CardDescription/>
				<CardLayer2 dateValue={new Date()} listTotalCount={this.props.listCount} />
			</div>
		);
	}
}

class CardListContainer extends React.Component{

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
			<div style={{width:300 }} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
				<div style={{width:300}}>
				<table style={{width:"100%"}}>
					<tr>
						 <td style={{align:"left"}}> <b>{this.props.cardTitle }</b> </td> 
						<td style={{align:"right",width:30}}> <button className="flat_button"  >...</button> </td>
					</tr>	
				</table>
				</div>
				<div style={{backgroundColor:"#ffffff",position:"relative"}} >
					<button className="flat_button_z" style={{visibility:this.state.editButtonVisible }} >...</button>
					<CardColorLabels />
					<CardDescription/>
					<CardLayer2 dateValue={new Date()} listTotalCount="1" />
				</div>
				<CardComponent compBackColor="#ffffff" className="flag_button_z" editButtonVisible={this.state.editButtonVisible} listCount="1" />
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
		<div className="cardhead" >
			<MuiThemeProvider>
				<CardListContainer cardTitle="This is a title 3"  />
			</MuiThemeProvider>

		</div>

		);	
	}
}

function test_app2(){
        /*React element can only return one element*/
        return (
		<div style={cardListStyle}>
			<MuiThemeProvider>
				<DatePicker hintText="Portrait Dialog" defaultDate={new Date()} container="inline" /> 
			</MuiThemeProvider>

		</div>
	) ;
}



/*This is a commecnt functions rendered as func() */
ReactDOM.render(
	<CardListComponent/>,
	document.getElementById('root')

);

