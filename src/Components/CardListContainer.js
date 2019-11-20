import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from './CardComponent';

class CardListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.flatButtonClick = this
            .flatButtonClick
            .bind(this);
        this.onListTitleChange = this
            .onListTitleChange
            .bind(this);
        this.state = {
            listTitle: this.props.listTitle
        };
        this.name = "CardListContainer";
    }

    componentDidMount() {}

    onListTitleChange(title) {
        this.setState({listTitle: title});
    }

    testReactDom() {
        var component = ReactDOM.findDOMNode(this);
        var rect = component.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        alert("rect:" + rect.top + " " + rect.right + " " + rect.left);
    }

    flatButtonClick() {
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
        console.log("test test test flat button");
    }

    render() {
        var listCount = 0;

        // 	console.log("cardData length:" + this.props.data.cardData.length);
        // 	if(this.props.data.cardData.length==0) return (null);

        var cardData = this
            .props
            .data
            .cardData
            .map(function (e) {
                return <CardComponent
                    comid={e.id}
                    compBackColor="#ffffff"
                    className="flag_button_z"
                    listCount={e.listItems.length}
                    width='300'
                    rowCount="1"
                    cardIsVisible="true"
                    description={e.title}
                    cardDate={e.cardDate}
                    listItems={e.listItems}
                    labelItems={e.labelItems}
                    menuEvent={this.props.menuEvent}/>;

            }, this);

        //console.log('card-data:' + this.props.data.cardData[0].id);

        return (
            <div
                className="simple-header"
                style={{
                width: 320
            }}>
                <table style={{
                    width: "100%"
                }}>
                    <tbody>
                        <tr>
                            <td>
                                <table
                                    style={{
                                    width: "100%",
                                    height: 30
                                }}>
                                    <tbody>
                                        <tr>
                                            <td className="simple-header">
                                                <b>{this.state.listTitle}</b>
                                            </td>
                                            <td
                                                style={{
                                                align: "right",
                                                width: 30
                                            }}>
                                                <button className="flat_button" onClick={this.flatButtonClick}>...</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <div className="card-container">
                                    {cardData}
                                </div>
                            </td>
                            <td
                                style={{
                                width: 30
                            }}></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default CardListContainer;