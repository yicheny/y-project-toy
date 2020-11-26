import React, { useEffect, useMemo } from 'react';
import './GridView.scss';
import ConnectionPath from "./utils/ConnectionPath";
import { createGrid, Grid } from "./Component/Grid";

function GridView(props) {
    const items = useMemo(()=>{
        return [
            {x:1,y:1,className: 'source',id:'b1'},
            {x:4,y:6,className: 'target',id:'b2'},
            {x:1,y:4,className:'wall'},
            {x:2,y:4,className:'wall'},
            {x:3,y:4,className:'wall'},
            {x:4,y:4,className:'wall'},
        ]
    },[]);

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
        try {
            const connectList = [
                {sourceId:'b1',targetId:'b2'}
            ]
            const connectPath = ConnectionPath.create({grid,connectList})
            return connectPath.clear;
        }catch ( e ){
            console.error(e);
        }
    },[grid]);

    return <div className='GridView'>
        <Grid items={items} grid={grid}/>
    </div>
}

export default GridView;
