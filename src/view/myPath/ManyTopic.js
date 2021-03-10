import React, { useMemo } from 'react';
import ConnectionContainer from "./Component/ConnectionContainer";
import { createGrid, Grid } from "./Component/Grid";
import './ManyTopic.scss';

const mockData = [
    {
        nodes:[
            {x:1,y:1,id:'a1',className: 'source'},
            {x:4,y:2,id:'a2',className: 'target'},
            {x:1,y:4,id:'a3',className: 'source'},
            {x:4,y:4,id:'a4',className: 'target'},
        ],
        links:[
            {sourceId:'a1',targetId:'a2'},
            {sourceId:'a3',targetId:'a4'},
        ]
    },
    {
        nodes:[
            {x:1,y:1,id:'b1',className: 'source'},
            {x:4,y:2,id:'b2',className: 'target'},
            {x:1,y:4,id:'b3',className: 'source'},
            {x:4,y:4,id:'b4',className: 'target'},
        ],
        links:[
            {sourceId:'b4',targetId:'b2'},
            {sourceId:'b3',targetId:'b4'},
        ]
    },
]

function ManyTopic(props) {
    return (<div className='ManyTopic'>
        {
            mockData.map((x,i)=>{
                return <Topic key={i} items={x.nodes} links={x.links} groupName={`group-${i}`}/>
            })
        }
    </div>);
}

function Topic({items,links,groupName}){
    const grid = useMemo(()=>createGrid({cols:6,rows:6,items}),[items]);

    return <ConnectionContainer params={{connectList:links,grid,groupName}}>
        <Grid draggable={false} grid={grid} items={items} groupName={groupName}/>
    </ConnectionContainer>
}

export default ManyTopic;
