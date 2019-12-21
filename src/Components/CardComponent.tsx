import React from 'react';
import ReactDOM from 'react-dom';
import CardDateLayer from './CardDateLayer';
import CardColorLabels from './CardColorLabels';
import TextField from '@material-ui/core/TextField';
import {TVisibility, Nullable, LabelItemRows, MenuPosType,CardData} from '../model/ListModel';
import {connect} from 'react-redux';
import {updateCard} from '../reducers/ListReducer';

type CardComponentProps = {
    menuEvent: (m : MenuPosType, t : any) => void;
    width: string;
    listId:number;
    rowCount: number;
    cardIsVisible: string;
    cardData:CardData;
	updateCardEvent:(card:CardData)=>void;
}

type CardComponentState = {
    name: string,
    editButtonVisible: TVisibility;
}

class CardComponent extends React.PureComponent < CardComponentProps,
CardComponentState > {
    name : string;

    constructor(props : CardComponentProps) {
        super(props);
        this.onMouseOver = this
            .onMouseOver
            .bind(this);
        this.onMouseOut = this
            .onMouseOut
            .bind(this);
        this.onCardMenuEvent = this
            .onCardMenuEvent
            .bind(this);
        this.onButtonClick = this
            .onButtonClick
            .bind(this);
        this.handleTitleChange=this
            .handleTitleChange
            .bind(this);
        this.state = {
            editButtonVisible: "hidden",
            name: this.props.cardData.title
        };

        this.name = "CardComponent";
    }

    onButtonClick() {
        var component : any = ReactDOM.findDOMNode(this);
        var rect = component.getBoundingClientRect();
        var offsetWidth = component.offsetWidth;
        var menuPos:MenuPosType = {
            topValue: rect.top,
            leftValue: rect.left + offsetWidth,
            cardId:this.props.cardData.id,
            id:this.props.listId,
            data: ""
        };

        this
            .props
            .menuEvent(menuPos, this);
    }

    onCardMenuEvent(e : any) {}

    onMouseOver() {
        this.setState({editButtonVisible: "visible"});
    }

    onMouseOut() {
        this.setState({editButtonVisible: "hidden"});
    }

    handleTitleChange = (e: any)=> {
		this.props.updateCardEvent({...this.props.cardData,title:e.target.value});
    }


    render() {
        var componentId = this.props.cardData.id;
        var cardDate = this.props.cardData.cardDate?this.props.cardData.cardDate:"";

        console.log("Card Component render " + componentId+ " " +this.props.cardData.title+ " date:" + cardDate);

        var textFieldId : string = "textField" + this.props.cardData.id;
        var divId="CardComponentId"+componentId;
        var listCount=this.props.cardData.listItems?this.props.cardData.listItems.length:0;
        return (
                <div id={divId}
                        className="card"
                        style={{
                    position: "relative",
                    width: this.props.width
                }}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
                <button
                    className="flat_button_z"
                    style={{
                        visibility: this.state.editButtonVisible
                    }}
                    onClick={this.onButtonClick}>...</button>
                <CardColorLabels key={componentId}
                    rowCount={this.props.rowCount}
                    labelItems={this.props.cardData.labelItems}/>
                <TextField key={textFieldId}
                    margin="normal"
                     multiline
                    value={this.props.cardData.title}
                    defaultValue={this.props.cardData.title} 
                    onChange={this.handleTitleChange} 
                    InputProps={{
                        disableUnderline: true
                    }}
                />
                <CardDateLayer
                    key={"CardDateLayer" + this.props.cardData.id}
                    cardData={this.props.cardData}
                    listTotalCount={listCount}
                    listCompletedCount={0}
                    visible={this.props.cardIsVisible}
                />
                <div className="bottom-card-section"></div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch:any) {
    
    return {
		updateCardEvent:(card:CardData)=>{
			dispatch(updateCard(card))
		},
	}
};


export default connect(null,mapDispatchToProps)(CardComponent);
//export default CardComponent;

