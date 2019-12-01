import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from './CardComponent';
import {MenuPosType,CardData,ListData,Nullable} from '../model/ListModel';

type CardComponentListProps={
    listId:number;
    listTitle:string;
    menuEvent:(m:MenuPosType,t:any)=>void;
    data:Nullable<ListData>;
}

type CardComponentListState={
    listTitle:string;
}
    
class CardComponentList extends React.PureComponent<CardComponentListProps,CardComponentListState> {
    name:string;

    constructor(props:CardComponentListProps) {
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

    flatButtonClick() {
        var component:any = ReactDOM.findDOMNode(this);
        var rect:any = component.getBoundingClientRect();
        var offsetWidth = component.offsetWidth;
        var menuPos = {
            topValue: rect.top,
            leftValue: rect.left + offsetWidth,
            id:this.props.listId,
            data:this.state.listTitle,
            cardId:0
        };

        this
            .props
            .menuEvent(menuPos, this);
    }

    render() {
        var listCount = 0;
        var me=this.props.menuEvent;
        var listid:number=this.props.listId;
        var cardData = this
            .props
            .data?
            this.props.data.cardData?
            this.props.data.cardData
            .map(function (e:CardData) {

                return <CardComponent
                    key={e.id}
                    comid={e.id}
                    listId={listid}
                    listCount={e.listItems?e.listItems.length:0}
                    width='300'
                    rowCount={1}
                    cardIsVisible="true"
                    description={e.title}
                    cardDate={e.cardDate?e.cardDate:""}
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


export default CardComponentList;