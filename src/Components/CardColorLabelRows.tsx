import React from "react";
import * as m from "../Model/ListModel";
import { connect } from "react-redux";
import { create } from "domain";

type CardColorLabelRowsProps = {
  cardId: number;
  listData: m.LabelItem[];
  //	labelItems:m.Nullable<m.LabelItemRows[]>;
};

const selectCardLabelItems = (state: m.LabelItem[], cardId: number) => {
  return state.filter(elem => {
    return elem.cardid === cardId;
  });
};

const CardColorLabelRows = (props: CardColorLabelRowsProps): any => {
  const { listData, cardId } = props;

  const elemsPerRow = 5;
  const createRows = (): any => {
    if (listData.length == 0) {
      return null;
    }

    var index = 1;
    if (listData.length > elemsPerRow) {
      index = Math.ceil(listData.length / 5) + 1;
    }

    var data: JSX.Element[] = [];
    for (var i = 0; i < index; i++) {
      var cols = listData
        .filter((elem, elem_index) => {
          if (
            elem_index < (i + 1) * elemsPerRow &&
            elem_index >= i * elemsPerRow
          ) {
            return elem;
          }
        })
        .map(elem => {
          return (
            <td>
              <div
                key={elem.labelitemid}
                style={{
                  backgroundColor: elem.color,
                  width: elem.width,
                  height: elem.height
                }}
              />
            </td>
          );
        });

      data.push(<tr>{cols}</tr>);
    }

    return data;
  };

  const list = createRows();
  return <tbody>{list}</tbody>;
};

const mapStateToProps = (state: any, props: CardColorLabelRowsProps) => {
  return {
    listData: selectCardLabelItems(state.labelItemsDisplay, props.cardId)
  };
};

export default connect(mapStateToProps, null)(CardColorLabelRows);
