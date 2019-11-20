import React from 'react';

class CardColorLabelRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var colNo = this.props.data.rows.length;
        var data = this.props.data.rows;
        var list = [];
        var column = {};
        var id_ = "";
        for (var c = 0; c < colNo; c++) {
            column = data[c];
            id_ = "ccrlr" + c
            list.push(
                <td key={id_}>
                    <div
                        key={id_}
                        style={{
                        backgroundColor: column.color,
                        width: column.width,
                        height: column.height
                    }}/>
                </td>
            );
        }
        return (
            <tr>{list}</tr>
        );
    }
};

export default CardColorLabelRow;