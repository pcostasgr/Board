import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';

type CardDateLayerProps={
    dateValue:string;
    listCompletedCount:number;
    listTotalCount:number;
    visible:string;
}

class CardDateLayer extends React.Component<CardDateLayerProps> {
    dateValue:Date;

    constructor(props:CardDateLayerProps) {
        super(props);
        //this.dateValue=this.props.dateValue;
        this.dateValue=new Date();
    }

    handleDateChange=(date:any)=> {
        //setSelectedDate(date);
        this.dateValue=date;
        console.log("selected date:" + date);
       // this.dateValue=new Date();
    };

    render() {

        var dateValue = this.props.dateValue;

        var listCompleteCount = this.props.listCompletedCount;
        var listTotalCount = this.props.listTotalCount;
        var isVisible = this.props.visible;

        if (listTotalCount == 0 && dateValue == "") {
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
        if (dateValue != "") {
            dateValue_=new Date(dateValue);

            list.push(
                <td style={{
                    textAlign: "left"
                }}>
                   {/*} <KeyboardDatePicker
                        hintText="Portrait Dialog"
                        defaultDate={dateValue_}
                        container="inline"
            autoOk={true}/>*/}
                    <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={this.dateValue}
                            format="dd/MM/yyyy"
                            onChange={this.handleDateChange}
                            autoOk={true}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                    />    
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

export default CardDateLayer;