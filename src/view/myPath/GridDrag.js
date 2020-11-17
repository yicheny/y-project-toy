import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./utils/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './GridDrag.scss';
import { uniqKeyFor } from "../../utils/publickFun";

const INIT_ITEMS = [
    {x:1,y:1,element:<div className='box b1' id='b1'/>,id:'b1'},
    {x:4,y:6,element:<div className='box b2' id='b2'/>,id:'b2'},
    {x:4,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:5,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:6,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
];

function GridDrag(props) {
    const [items,setItems] = useState(Object.create(INIT_ITEMS))

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
        const connectList = [
            {sourceId:'b1',targetId:'b2'}
        ]
        const connectPath = ConnectionPath.create({grid,connectList})
        return connectPath.clear;
    },[grid]);

    return (
        <div className='GridDrag'>
            <Grid grid={grid} items={items} onChangeLocation={onChangeLocation}/>
        </div>
    );

    function onChangeLocation(source,target){
        const {id} = source;
        const item = _.find(items,x=>x.id===id);
        item.x = target.x;
        item.y = target.y;
        setItems(_.clone(items));
    }
}

export default GridDrag;
