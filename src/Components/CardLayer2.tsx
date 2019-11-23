import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import {Nullable} from '../model/ListModel';

type CardLayer2Props={
    dateValue:string;
    listCompletedCount:number;
    listTotalCount:number;
    visible:string;
}

class CardLayer2 extends React.Component<CardLayer2Props> {
    constructor(props:CardLayer2Props) {
        super(props);
    }

    render() {

        var dateValue = this.props.dateValue;

        console.log("DateValue:" +dateValue);

        var listCompleteCount = this.props.listCompletedCount;
        var listTotalCount = this.props.listTotalCount;
        var isVisible = this.props.visible;

        console.log("listTotalCount:" + listTotalCount);
        console.log("isVisible:"+isVisible);
        console.log("listCompletedCount:"+listCompleteCount);

        if (listTotalCount == 0 && dateValue == "") {
            return null;
        }

        if (isVisible != "true") {
            return null;
        }

        console.log("PASS 0");

        if (!listCompleteCount) {
            listCompleteCount = 0;
        }

        var list = [];

        console.log("PASS 1");

        var dateValue_;
        if (dateValue != "") {
            
            console.log("PASS 2");
            dateValue_=new Date("1/1/2019");

            console.log("date:" + dateValue_);
            list.push(
                <td style={{
                    textAlign: "left"
                }}>
                    <DatePicker
                        hintText="Portrait Dialog"
                        defaultDate={dateValue_}
                        container="inline"
                        autoOk={true}/>
                </td>
            );
        }

        if (listTotalCount > 0) {
            list.push(
                <td style={{
                    textAlign: "right"
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