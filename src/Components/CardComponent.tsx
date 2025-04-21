import React from "react";
import ReactDOM from "react-dom";
import CardDateLayer from "./CardDateLayer";
import CardColorLabels from "./CardColorLabels";
import TextField from "@mui/material/TextField";
import {
  TVisibility,
  Nullable,
  LabelItemRows,
  MenuPosType,
  CardData
} from "../Model/ListModel";
import { connect } from "react-redux";
import { updateCard } from "../reducers/ListReducer";

type CardComponentProps = {
  menuEvent: (m: MenuPosType, t: any) => void;
  width: string;
  listId: number;
  rowCount: number;
  cardIsVisible: string;
  cardData: CardData;
  updateCardEvent: (card: CardData) => void;
};

type CardComponentState = {
  name: string;
  editButtonVisible: TVisibility;
};

class CardComponent extends React.PureComponent<
  CardComponentProps,
  CardComponentState
> {
  name: string;

  constructor(props: CardComponentProps) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onCardMenuEvent = this.onCardMenuEvent.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.state = {
      editButtonVisible: "hidden",
      name: this.props.cardData.cardtitle
    };

    this.name = "CardComponent";
  }
  ref = React.createRef<HTMLDivElement>();

  onButtonClick() {

    console.log("CardComponent onButtonClick " + this.props.cardData.cardid);
    const component = this.ref.current;
    if (!component) return;
    
    const rect = component.getBoundingClientRect();
    const offsetWidth = component.offsetWidth;
    const menuPos: MenuPosType = {
      topValue: rect.top,
      leftValue: rect.left + offsetWidth,
      cardId: this.props.cardData.cardid,
      id: this.props.listId,
      data: ""
    };

    this.props.menuEvent(menuPos, this);
  }

  onCardMenuEvent(e: any) {}

  onMouseOver() {
    this.setState({ editButtonVisible: "visible" });
  }

  onMouseOut() {
    this.setState({ editButtonVisible: "hidden" });
  }

  handleTitleChange = (e: any) => {
    this.props.updateCardEvent({
      ...this.props.cardData,
      cardtitle: e.target.value
    });
  };

  render() {
    var componentId = this.props.cardData.cardid;
    var cardDate = this.props.cardData.carddate
      ? this.props.cardData.carddate
      : "";

    console.log(
      "Card Component render " +
        componentId +
        " " +
        this.props.cardData.cardtitle +
        " date:" +
        cardDate
    );

    var textFieldId: string = "textField" + this.props.cardData.cardid;
    var divId = "CardComponentId" + componentId;
    var listCount = this.props.cardData.listItems
      ? this.props.cardData.listItems.length
      : 0;
    return (
      <div
        ref={this.ref}
        id={divId}
        className="card"
        style={{
          position: "relative",
          width: this.props.width
        }}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <button
          className="flat_button_z"
          style={{
            visibility: this.state.editButtonVisible
          }}
          onClick={this.onButtonClick}
        >
          ...
        </button>
        <CardColorLabels
          key={componentId}
          cardId={this.props.cardData.cardid}
          rowCount={this.props.rowCount}
          labelItems={this.props.cardData.labelItems}
        />
        <TextField
          key={textFieldId}
          margin="normal"
          multiline
          value={this.props.cardData.cardtitle}
          //defaultValue={this.props.cardData.title}
          onChange={this.handleTitleChange}
          InputProps={{
            disableUnderline: true
          }}
        />
        <CardDateLayer
          key={"CardDateLayer" + this.props.cardData.cardid}
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

function mapDispatchToProps(dispatch: any) {
  return {
    updateCardEvent: (card: CardData) => {
      dispatch(updateCard(card));
    }
  };
}

export default connect(null, mapDispatchToProps)(CardComponent);
