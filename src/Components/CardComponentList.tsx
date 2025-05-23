import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import CardComponent from "./CardComponent";
import { MenuPosType, CardData, ListData, Nullable } from "../Model/ListModel";
import { TextField } from "@mui/material";
import { updateListTitle } from "../reducers/ListReducer";
import NewCardTitleLayerComp from "./NewCardTitleLayerComp";
import NewListTitleLayerComp from "./NewListTitleLayerComp";

type CardComponentListProps = {
  listId: number;
  listTitle: string;
  menuEvent: (m: MenuPosType, t: any) => void;
  data: Nullable<ListData>;
  updateListTitleEvent: (listId: number, listTitle: string) => void;
};

type CardComponentListState = {
  listTitle: string;
  fieldMultiline: boolean;
  fieldRows: number;
  headerSaveButtonVisible: "hidden" | "visible";
};

class CardComponentList extends React.PureComponent<
  CardComponentListProps,
  CardComponentListState
> {
  name: string;

  constructor(props: CardComponentListProps) {
    super(props);
    this.flatButtonClick = this.flatButtonClick.bind(this);
    this.onListTitleChange = this.onListTitleChange.bind(this);

    this.onTextFieldSave = this.onTextFieldSave.bind(this);

    this.state = {
      listTitle: this.props.listTitle,
      fieldMultiline: false,
      fieldRows: 1,
      headerSaveButtonVisible: "hidden"
    };
    this.onHandleTitleChange = this.onHandleTitleChange.bind(this);
    this.name = "CardListContainer";
  }
  private cardListRef = React.createRef<HTMLDivElement>();


  componentDidMount() {}

  onListTitleChange(title: string) {
    this.setState({ listTitle: title });
  }

  onHandleTitleChange(event: any) {
    this.setState({ listTitle: event.target.value });
    this.props.updateListTitleEvent(this.props.listId, event.target.value);
  }

  flatButtonClick() {

    console.log("flatButtonClick onButtonClick " );
    const component = this.cardListRef.current;
    if (!component) {
      console.error("Ref is null, the DOM element is not available.");
      return;
    }

  
    const rect = component.getBoundingClientRect();
    const offsetWidth = component.offsetWidth;
    const menuPos = {
      topValue: rect.top,
      leftValue: rect.left + offsetWidth,
      id: this.props.listId,
      data: this.state.listTitle,
      cardId: 0
    };

    this.props.menuEvent(menuPos, this);
  }

  onTextFieldSave() {
    console.log("Save list title:" + this.state.listTitle);
  }

  render() {
    var listCount = 0;
    var me = this.props.menuEvent;
    var listid: number = this.props.listId;
    var listHeaderTextId = "listHeaderTextId" + listid;

    console.log("Rendering List:" + listid);

    var cardData = this.props.data
      ? this.props.data.cardData
        ? this.props.data.cardData.map(function(e: CardData) {
            return (
              <CardComponent
                key={e.cardid}
                cardData={e}
                listId={listid}
                width="300"
                rowCount={1}
                cardIsVisible="true"
                menuEvent={me}
              />
            );
          }, this)
        : []
      : [];

    return (
      <div ref={this.cardListRef}
        onMouseOut={() => {
          this.setState({
            fieldMultiline: false,
            fieldRows: 1,
            headerSaveButtonVisible: "hidden"
          });
        }}
        style={{
          width: 350,
          background: "#FFFFFF"
        }}
      >
        <table
          style={{
            width: "100%",
            border: 0
          }}
        >
          <tbody>
            <tr>
              <td>
                <div
                  className="list-header-div-content"
                  id={"ListHeaderFieldIdv" + listid}
                >
                  <span>
                    <TextField
                      key={listHeaderTextId}
                      value={this.state.listTitle}
                      multiline={this.state.fieldMultiline}
                      rows={this.state.fieldRows}
                      onChange={this.onHandleTitleChange}
                      onClick={() => {
                        console.log("Text field is clicked");
                        this.setState({
                          fieldMultiline: true,
                          fieldRows: 3,
                          headerSaveButtonVisible: "visible"
                        });
                      }}
                      InputProps={{
                        disableUnderline: true
                      }}
                      style={{ width: 300 }}
                    />
                  </span>
                  <span>
                    <button
                      className="flat_button"
                      onClick={this.flatButtonClick}
                    >
                      ...
                    </button>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="card-container">
                  {cardData}
                  <NewCardTitleLayerComp listId={this.props.listId} />
                </div>
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    updateListTitleEvent: (listId: number, listTitle: string) => {
      dispatch(updateListTitle({ listid: listId, listTitle: listTitle }));
    }
  };
}

export default connect(null, mapDispatchToProps)(CardComponentList);
