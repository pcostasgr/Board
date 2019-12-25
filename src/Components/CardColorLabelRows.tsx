import React from 'react';
import CardColorLabelRow from './CardColorLabelRow';
import * as m from '../Model/ListModel';

type CardColorLabelRowsProps={
	labelItems:m.Nullable<m.LabelItemRows[]>;
}

class CardColorLabelRows extends React.Component<CardColorLabelRowsProps>{
	constructor(props:CardColorLabelRowsProps){
		super(props);
	}

	render(){
		var rowsData:m.Nullable<m.LabelItemRows[]>=this.props.labelItems;
		const list=rowsData?rowsData.map( (x:m.LabelItemRows,index:number)=>{
			return <CardColorLabelRow key={index}  data={x}  />
		}):[];
	
		return (
			<tbody>
			{list}
			</tbody>		
		);
	}
};

export default CardColorLabelRows;