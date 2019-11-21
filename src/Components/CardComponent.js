import React from 'react';
import ReactDOM from 'react-dom';
import CardLayer2 from './CardLayer2';
import CardColorLabels from './CardColorLabels';
import TextField from 'material-ui/TextField';

class CardComponent extends React.Component {
    constructor(props) {
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
        var component = ReactDOM.findDOMNode(this);
        var rect = component.getBoundingClientRect();
        var offsetWidth = component.offsetWidth;
        var menuPos = {
            topValue: rect.top,
            leftValue: rect.left + offsetWidth
        };

        this
            .props
            .menuEvent(menuPos, this);

    }

    onCardMenuEvent(e) {}

    onMouseOver() {
        this.setState({editButtonVisible: "visible"});
    }

    onMouseOut() {
        {/*alert('Test OnMousOver')*/
        }
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
                <CardLayer2
                    dateValue={cardDate}
                    listTotalCount={this.props.listCount}
                    visible={this.props.cardIsVisible}/>
                <div className="bottom-card-section"></div>
            </div>
        );
    }
}

export default CardComponent;