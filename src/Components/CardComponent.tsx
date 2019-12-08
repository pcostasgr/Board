import React from 'react';
import ReactDOM from 'react-dom';
import CardDateLayer from './CardDateLayer';
import CardColorLabels from './CardColorLabels';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import {TVisibility, Nullable, LabelItemRows, MenuPosType} from '../model/ListModel';

type CardComponentProps = {
    menuEvent: (m : MenuPosType, t : any) => void;
    width: string;
    cardDate: string;
    comid: number;
    listId:number;
    rowCount: number;
    listCount: number;
    cardIsVisible: string;
    description: string;
    labelItems: Nullable < LabelItemRows[] >;
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
        this.state = {
            editButtonVisible: "hidden",
            name: this.props.description
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
            cardId:this.props.comid,
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

    handleChange = (e: any)=> {
        console.log("name:" + e.target.value);
         this.setState({ name: e.target.value });
    }


    render() {
        var componentId = this.props.comid;
        console.log("Card Component render " + componentId+ " " +this.props.description);

        var cardDate = this.props.cardDate;

        var textFieldId : string = "textField" + this.props.comid;
        var divId="CardComponentId"+componentId;
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
                    labelItems={this.props.labelItems}/>
                <TextField key={textFieldId}
                     
                    margin="normal"
                     multiline
                    value={this.state.name}
                    defaultValue={this.props.description} 
                    onChange={this.handleChange} InputProps={{
                    disableUnderline: true
                }}/>
                <CardDateLayer
                    dateValue={cardDate}
                    listTotalCount={this.props.listCount}
                    listCompletedCount={0}
                    visible={this.props.cardIsVisible}/>
                <div className="bottom-card-section"></div>
            </div>
        );
    }
}

export default CardComponent;