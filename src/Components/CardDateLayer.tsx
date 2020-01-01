import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {connect} from 'react-redux';
import {CardData} from '../Model/ListModel';
import {updateCard} from '../reducers/ListReducer';

type CardDateLayerProps={
    cardData:CardData;
    listCompletedCount:number;
    listTotalCount:number;
    visible:string;
	updateCardLayerEvent:(card:CardData)=>void;
}


class CardDateLayer extends React.Component<CardDateLayerProps> {

    constructor(props:CardDateLayerProps) {
        super(props);
    }

    handleDateChange=(date:any)=> {
        
        var month=date.getMonth();
		month+=1;
		var formatedDate=date.getFullYear() + "-" + month + "-" + date.getDate();
		//this.setState({cardData:{...this.state.cardData,cardDate:formatedDate}});
		
		console.log("handle date layer:" +formatedDate) ;
		this.props.updateCardLayerEvent(
			{
					...this.props.cardData,cardDate:formatedDate
			}
		);

    };

    render() {

        var dateValue = this.props.cardData.cardDate;

        console.log("card date layer:" + dateValue);

        var listCompleteCount = this.props.listCompletedCount;
        var listTotalCount = this.props.listTotalCount;
        var isVisible = this.props.visible;

        if (listTotalCount == 0 && dateValue == "") {
            return null;
        }

        if (isVisible != "true") {
            return null;
        }

        if (!listCompleteCount) {
            listCompleteCount = 0;
        }

        var list = [];

        var dateValue_;
        if (dateValue !=null) {
            dateValue_=new Date(dateValue);

            list.push(
                 <React.Fragment key={"tDate"+ this.props.cardData.id}> 
                <td style={{
                    textAlign: "left"
                }}>
                    {dateValue} 
                </td>
                </React.Fragment>
            );
        }

        if (listTotalCount > 0) {
            
            list.push(
             <React.Fragment key={"tListCount"+ this.props.cardData.id}> 
                <td  style={{
                    textAlign: "right"
                }}>
                    <b>
                        {listCompleteCount}/{listTotalCount}</b>
                </td>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment key={"tdDate"+ this.props.cardData.id}> 
            <div>
                <table style={{
                    width: "100%"
                }}>
                    <tbody>
                        <tr>
                            {list}
                        </tr>
                    </tbody>
                </table>
            </div>
            </React.Fragment>
        );
    }
};

/*
const mapStateToProps = (state:any) => {
    return {
        cardData:state.listDisplay.cardData
    };
};*/

function mapDispatchToProps(dispatch:any) {
    
    return {
		updateCardLayerEvent:(card:CardData)=>{

            console.log("upateCardLayerFired");
			dispatch(updateCard(card))
		},
	}
};

//export default CardDateLayer;
export default connect(null,mapDispatchToProps)(CardDateLayer);