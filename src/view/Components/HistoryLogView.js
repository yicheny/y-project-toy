import React from 'react';
import _ from 'lodash';
import { HistoryLog } from "../../component";

const mockData = _.times(8,x=>({
    title:`标题:${x+1}`,
    date:'2020-01-01',
}))


function HistoryLogView(props) {
    return (<div>
        {
            _.map(mockData,(x,i)=>{
                return <HistoryLog key={i}
                                   last={i===mockData.length-1}
                                   title={x.title}
                                   date={x.date}>
                    <div style={{height:300}}>info</div>
                </HistoryLog>;
            })
        }
    </div>);
}

export default HistoryLogView;
