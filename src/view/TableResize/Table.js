import React from 'react';
import _ from 'lodash';
import clsx from "clsx";
import './Table.scss';

function Table(props) {
    const {columns,data,className,style} = props;

    return (<div className={clsx('pt-table',className)} style={style}>
        <div className="pt-table-header pt-table-row">
            {
                _.map(columns,(col,i)=><Cell key={i} {...col} text={col.header}/>)
            }
        </div>

        <div className="pt-table-content">
            {_.map(data,(o,i)=>{
                return <Row key={i} data={o} columns={columns}/>
            })}
        </div>
    </div>);
}

export default Table;

function Row(props) {
    const {data,columns} = props;

    return <div className="pt-table-row">
        {
            _.map(columns,(col,i)=>{
                return <Cell key={i}  {...col} text={data[col.bind]}/>
            })
        }
    </div>
}

function Cell(props) {
    const {text,width=100,align='left'} = props;

    return <div className="pt-table-cell" style={{width,textAlign:align}}>
        {text}
    </div>
}
