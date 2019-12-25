import React from 'react';
import * as m from '../Model/ListModel'

type CardColorLabelRowProps={
    data:m.Nullable<m.LabelItemRows>;
}
class CardColorLabelRow extends React.Component<CardColorLabelRowProps> {
    constructor(props:CardColorLabelRowProps) {
        super(props);
    }

    render() {
        var list=this.props.data?
            this.props.data.rows?
            this.props.data.rows.map(
            (li:m.LabelItem,index:number)=>{
                var id_:string="ccrlr" + index;
                return (
                <td key={id_}>
                    <div
                        key={id_}
                        style={{
                        backgroundColor: li.color,
                        width: li.width,
                        height: li.height
                    }}/>
                </td>);
            }
        ):[]:[];
        
        return (
            <tr>{list}</tr>
        );
    }
};

export default CardColorLabelRow;