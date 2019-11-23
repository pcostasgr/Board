import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from './CardComponent';
import {MenuPosType,CardData,ListData,Nullable} from '../model/ListModel';

type CardListContainerProps={
    listTitle:string;
    menuEvent:(m:MenuPosType,t:any)=>void;
    data:Nullable<ListData>;
}

type CardListContainerState={
    listTitle:string;
}
    
class CardListContainer extends React.Component<CardListContainerProps,CardListContainerState> {
    name:string;

    constructor(props:CardListContainerProps) {
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

    onListTitleChange(title:string) {
        this.setState({listTitle: title});
    }

    testReactDom() {
        var component:any = ReactDOM.findDOMNode(this);
        var rect:any = component.getBoundingClientRect();
        //console.log(rect.top, rect.right, rect.bottom, rect.left);
        //alert("rect:" + rect.top + " " + rect.right + " " + rect.left);
    }

    flatButtonClick() {
        var component:any = ReactDOM.findDOMNode(this);
        var rect:any = component.getBoundingClientRect();
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
        var me=this.props.menuEvent;
        var cardData = this
            .props
            .data?
            this.props.data.cardData?
            this.props.data.cardData
            .map(function (e:CardData) {
                return <CardComponent
                    comid={e.id}
                    //compBackColor="#ffffff"
                    //className="flag_button_z"
                    listCount={e.listItems?e.listItems.length:0}
                    width='300'
                    rowCount={1}
                    cardIsVisible="true"
                    description={e.title}
                    cardDate={e.cardDate?e.cardDate:""}
                    //listItems={e.listItems}
                    labelItems={e.labelItems}
                    menuEvent={me}/>;

            }, this):[]:[];

        return (
            <div
                className="simple-header"
                style={{
                    width: 350
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
                                                //align: "right",
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