import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';

type CardDateLayerProps={
    dateValue:string;
    listCompletedCount:number;
    listTotalCount:number;
    visible:string;
}

type CardDateLayerState={
    dateValue:Date;
}

class CardDateLayer extends React.Component<CardDateLayerProps,CardDateLayerState> {

    constructor(props:CardDateLayerProps) {
        super(props);
        if (this.props.dateValue != "") {
            this.state={dateValue:new Date(this.props.dateValue)};
        }else{
            this.state={dateValue:new Date()};
        }
    }

    handleDateChange=(date:any)=> {
        this.setState({dateValue:date});
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
                    <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            id="date-picker-inline"
                            value={this.state.dateValue}
                            defaultValue={this.state.dateValue}
                            format="dd/MM/yyyy"
                            onChange={this.handleDateChange}
                            autoOk={true}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            InputProps={{
                                 disableUnderline: true,
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