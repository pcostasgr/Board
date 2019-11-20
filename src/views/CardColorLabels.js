import React from 'react';
import CardColorLabelRows from './CardColorLabelRows';

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
	
		if(labelItems==null || labelItems.length==0){			
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

export default CardColorLabels;