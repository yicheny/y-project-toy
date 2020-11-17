import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./utils/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './GridDrag.scss';
import { uniqKeyFor } from "../../utils/publickFun";
import { message } from "y-ui0";

const INIT_ITEMS = [
    {x:1,y:1,element:<div className='box b1' id='b1'/>,id:'b1'},
    {x:4,y:6,element:<div className='box b2' id='b2'/>,id:'b2'},
    {x:4,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:5,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:6,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:3,y:5,element:<div className='box wall'/>,id:uniqKeyFor()},
    {x:3,y:6,element:<div className='box wall'/>,id:uniqKeyFor()},
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
        const {x:t_x,y:t_y} = target;
        const targetItem = _.find(items,o=>o.x===t_x&&o.y===t_y);
        if(targetItem) return message.show({info:'指定位置已有位置存在，不可移动'});
        const {id} = source;
        const item = _.find(items,x=>x.id===id);
        if(!item) return console.error("拖动出现异常!");
        item.x = t_x;
        item.y = t_y;
        setItems(_.clone(items));
    }
}

export default GridDrag;
