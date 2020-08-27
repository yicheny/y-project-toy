import React from 'react';
import _ from 'lodash';
import Table from "./Table";

const columns = _.times(5,i=>({header:`第${i+1}列`,bind:'name'}))

function ColumnsResize(props) {
    return (<div>
        <Table data={_.times(10,x=>({name:_.random(1000)}))} columns={columns}/>
    </div>);
}

export default ColumnsResize;
