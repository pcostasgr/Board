import React from 'react';
import CardColorLabelRow from './CardColorLabelRow';

class CardColorLabelRows extends React.Component{
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

export default CardColorLabelRows;