import React from 'react';
import DatePicker from 'material-ui/DatePicker';

class CardLayer2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var dateValue = this.props.dateValue;
        var listCompleteCount = this.props.listCompleteCount;
        var listTotalCount = this.props.listTotalCount;
        var isVisible = this.props.visible;

        if (listTotalCount == 0 && dateValue == 0) {
            return null;
        }

        if (isVisible != "true") {
            return null;
        }

        if (!listCompleteCount) {
            listCompleteCount = 0;
        }

        var list = [];

        var dateValue_;
        if (dateValue != 0) {
            dateValue_ = new Date(dateValue);
            list.push(
                <td style={{
                    align: "left"
                }}>
                    <DatePicker
                        hintText="Portrait Dialog"
                        defaultDate={dateValue_}
                        container="inline"
                        autoOk="true"/>
                </td>
            );
        }

        if (listTotalCount > 0) {
            list.push(
                <td style={{
                    align: "right"
                }}>
                    <b>
                        {listCompleteCount}/{listTotalCount}</b>
                </td>
            );
        }

        return (
            <div>
                <table style={{
                    width: "100%"
                }}>
                    <tbody>
                        <tr>
                            {list}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};

export default CardLayer2;