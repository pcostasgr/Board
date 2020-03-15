import React from "react";
import CardColorLabelRows from "./CardColorLabelRows";
import * as m from "../Model/ListModel";

type CardColorLabelProps = {
  cardId: number;
  labelItems: m.Nullable<m.LabelItemRows[]>;
  rowCount: number;
};

type CardColorLabelState = {
  buttonVisible: "hidden" | "visible";
  rowsVisible: "hidden" | "visible";
};

class CardColorLabels extends React.Component<
  CardColorLabelProps,
  CardColorLabelState
> {
  constructor(props: CardColorLabelProps) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.state = {
      buttonVisible: "hidden",
      rowsVisible: "visible"
    };
  }

  onMouseOver() {
    {
      /*alert('Mouse Over Event'); */
    }
    var isvisible: m.TVisibility =
      this.state.buttonVisible === "hidden" ? "visible" : "hidden";
    this.setState({
      buttonVisible: isvisible
    });
  }

  render() {
    if (this.props.rowCount == 0) {
      return null;
    }

    var labelItems = this.props.labelItems;

    if (labelItems == null || labelItems.length == 0) {
      return null;
    }

    return (
      <table style={{ width: "inherit" }}>
        <tbody>
          <tr>
            <th>
              <table
                style={{ width: "inherit" }}
                onMouseOver={this.onMouseOver}
              >
                <CardColorLabelRows
                  cardId={this.props.cardId}
                  //labelItems={labelItems}
                  listData={[]}
                />
              </table>
            </th>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CardColorLabels;
