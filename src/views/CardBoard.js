import React from 'react';
import {connect} from 'react-redux';
import './../cardlist.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {addList} from './../actions/actions';
import PopUpDim from './PopUpDim';
import CardMenuList from './CardMenuList';
import CardListContainer from './CardListContainer';

class CardBoard extends React.Component {
    constructor(props) {
        super(props);
        this.disableContainer = this
            .disableContainer
            .bind(this);
        this.enableContainer = this
            .enableContainer
            .bind(this);

        this.state = {
            divPointerEvent: "all",
            opacity: 1,
            editMenuVisibility: "hidden",
            menuTopValue: 100,
            menuLeftValue: 100,
            cardListTitle: "",
            cardMenuVisibility: "hidden"
        };
    }

    disableContainer(rect, componentRef) {

        this.listContainer = componentRef;

        if (this.listContainer.name.localeCompare("CardListContainer") == 0) {
            this.setState({divPointerEvent: "none", opacity: 0.4, editMenuVisibility: "visible", menuTopValue: rect.topValue, menuLeftValue: rect.leftValue});

        }

        if (this.listContainer.name.localeCompare("CardComponent") == 0) {

            this.setState({divPointerEvent: "none", opacity: 0.4, cardMenuVisibility: "visible", menuTopValue: rect.topValue, menuLeftValue: rect.leftValue});
        }

    }

    enableContainer(e) {
        this.setState({divPointerEvent: "all", opacity: 1, editMenuVisibility: "hidden", cardMenuVisibility: "hidden"});

        if (this.listContainer.name.localeCompare("CardListContainer") == 0) {
            this
                .listContainer
                .onListTitleChange(e);
        }

        if (this.listContainer.name.localeCompare("CardComponent") == 0) {
            this
                .listContainer
                .onCardMenuEvent(e);
        }

    }

    render() {
        //var g__=getComponentDb();
        var cardList = this.props.boardList;

        //	console.log("---------------------------------------------------------------"
        // ); console.log(cardList);
        // 	console.log("---------------------------------------------------------------"
        // );

        var listData = cardList.map(function (e) {
            return <td id={"tdlist" + e.listItem} className="board-table-cell">

                <div className="card-list-head">
                    <MuiThemeProvider>
                        <CardListContainer
                            listTitle={e.listTitle}
                            menuEvent={this.disableContainer}
                            data={e}
                            popup={this.popup}/>
                    </MuiThemeProvider>

                </div>

            </td>

        }, this);

        var callbackf_ = this.callbackFunc;
        var topValue = 100;
        var leftValue = 50;
        return (
            <div className="list-header">
                <button
                    id="newListButton1"
                    onClick={() => {
                    this
                        .props
                        .createNewListEvent()
                }}>Add new list</button>

                <CardMenuList
                    visibility={this.state.cardMenuVisibility}
                    callf={this.enableContainer}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}/>

                <PopUpDim
                    callf={this.enableContainer}
                    visibility={this.state.editMenuVisibility}
                    topValue={this.state.menuTopValue}
                    leftValue={this.state.menuLeftValue}
                    ref={(popup) => {
                    this.popup = popup;
                }}/>
                <div>
                    <table
                        className="board-header-table"
                        style={{
                        pointerEvents: this.state.divPointerEvent,
                        opacity: this.state.opacity
                    }}>
                        <tbody>
                            <tr>
                                {listData}
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {boardList: state.lists};
};

function mapDispatchToProps(dispatch) {
    return {
        createNewListEvent: () => {
            dispatch(addList("Brand New List"))
            //console.log("This is a test:"+Math.random());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBoard);
