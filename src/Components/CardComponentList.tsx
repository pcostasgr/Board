import React from 'react';
import ReactDOM from 'react-dom';
import CardComponent from './CardComponent';
import {MenuPosType,CardData,ListData,Nullable} from '../Model/ListModel';
import TextField from '@material-ui/core/TextField';

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
        var listHeaderTextId="listHeaderTextId"+listid
        var cardData = this
            .props
            .data?
            this.props.data.cardData?
            this.props.data.cardData
            .map(function (e:CardData) {

                return <CardComponent
                    key={e.id}
                    cardData={e}
                    listId={listid}
                    width='300'
                    rowCount={1}
                    cardIsVisible="true"
                    menuEvent={me}/>;

            }, this):[]:[];

        return (
            <div
                className="simple-header"
                style={{
                    width:350,
                    border:0
                }}>
                <table style={{
                    width: "100%", border:0
                }}>
                    <tbody>
                        <tr >
                                <td>
                                    <div className="list-header-div-content" id={"ListHeaderFieldIdv"+listid}>
                                        <span> 
                                            <TextField
                                                key={listHeaderTextId}
                                                value={this.state.listTitle}
                                                defaultValue={this.state.listTitle}
                                                //onChange={this.handleChange}
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}

                                                style={{ width:300}}
                                            />
                                        </span>
                                        <span><button className="flat_button" onClick={this.flatButtonClick}>...</button></span>
                                    </div>
                                </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="card-container">
                                    {cardData}
                                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}


export default CardComponentList;