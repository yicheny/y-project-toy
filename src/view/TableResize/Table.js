import React, { Fragment, useState } from 'react';
import _ from 'lodash';
import clsx from "clsx";
import './Table.scss';

function getRunTimeCol(col){
    return _.defaults({width:100,align:'left'},col);
}

function Table(props) {
    const { columns, data, className, style } = props;
    const [resize, setResize] = useState(false);

    return (<div className={ clsx('pt-table', className) } style={ style }>
        <div className="pt-table-header pt-table-row"
             onMouseMove={ resize_move }
             onMouseUp={ () => setResize(false) }
             onMouseLeave={ () => setResize(false) }>
            {
                _.map(columns, (col, i) => {
                    const col_run_time = getRunTimeCol(col);
                    return <Fragment key={ i }>
                        <Cell key={ i }
                              width={col_run_time.width}
                              align={col_run_time.align}
                              text={ col_run_time.header }/>
                        <div className={ clsx('resize-line', { resize }) }
                             onMouseDown={()=>resize_start({col,index:i})}/>
                    </Fragment>
                })
            }
        </div>

        <div className="pt-table-content">
            { _.map(data, (o, i) => {
                return <Row key={ i } data={ o } columns={ columns }/>
            }) }
        </div>
    </div>);

    function resize_start(){
        setResize(true)
    }

    function resize_move(e){
        if(!resize) return null;
        e.preventDefault();
        e.stopPropagation();
    }
}

export default Table;

function Row(props) {
    const { data, columns } = props;

    return <div className="pt-table-row">
        {
            _.map(columns, (col, i) => {
                const col_run_time = getRunTimeCol(col);
                return <Cell key={ i }
                             width={col_run_time.width}
                             align={col_run_time.align}
                             text={ data[ col_run_time.bind ] }/>
            })
        }
    </div>
}

function Cell(props) {
    const { text, width, align } = props;

    return <div className="pt-table-cell" style={ { width, textAlign: align } }>
        { text }
    </div>
}
