import React from 'react';
import ReactDOM from 'react-dom';
import CardDateLayer from './CardDateLayer';
import CardColorLabels from './CardColorLabels';
import TextField from 'material-ui/TextField';
import { TVisibility,Nullable,LabelItemRows,MenuPosType } from '../model/ListModel';


type CardComponentProps={
    menuEvent:(m:MenuPosType,t:any)=>void;
    width:string;
    cardDate:string;
    comid:number;
    rowCount:number;
    listCount:number;
    cardIsVisible:string;
    description:string;
    labelItems:Nullable<LabelItemRows[]>;
}

type CardComponentState={
    name:string,
    editButtonVisible:TVisibility;
}

class CardComponent extends React.Component<CardComponentProps,CardComponentState> {
    name:string;

    constructor(props:CardComponentProps) {
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
            name: "CardComponent"
        };
        this.name = "CardComponent";
    }

    onButtonClick() {
        var component:any = ReactDOM.findDOMNode(this);
        var rect = component.getBoundingClientRect();
        var offsetWidth = component.offsetWidth;
        var menuPos = {
            topValue: rect.top,
            leftValue: rect.left + offsetWidth,
            data:""
        };

        this
            .props
            .menuEvent(menuPos, this);
    }

    onCardMenuEvent(e:any) {}

    onMouseOver() {
        this.setState({editButtonVisible: "visible"});
    }

    onMouseOut() {
        this.setState({editButtonVisible: "hidden"});
    }

    render() {
        var component_id = this.props.comid;
        //console.log("Card Component render " + component_id);

        var cardDate = this.props.cardDate;

        return (

            <div
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
                <CardColorLabels
                    rowCount={this.props.rowCount}
                    labelItems={this.props.labelItems}/>
                <TextField
                    id={"textField" + this.props.comid}
                    style={{
                    width: "inherit"
                }}
                    multiLine={true}
                    rows={1}
                    defaultValue={this.props.description}/>
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