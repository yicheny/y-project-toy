import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./utils/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './GridDrag.scss';
import { uniqKeyFor } from "../../utils/publickFun";
import { message } from "y-ui0";
import { getElementPath } from "./utils/utils";

const getInitItems = function (){
    return _.cloneDeep( [
        {x:1,y:1,element:<div className='box b1' id='b1'/>,id:'b1'},
        {x:4,y:6,element:<div className='box b2' id='b2'/>,id:'b2'},
        {x:4,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
        {x:5,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
        {x:6,y:4,element:<div className='box wall'/>,id:uniqKeyFor()},
        {x:3,y:5,element:<div className='box wall'/>,id:uniqKeyFor()},
        {x:3,y:6,element:<div className='box wall'/>,id:uniqKeyFor()},
        {x:3,y:7,element:<div className='box wall'/>,id:uniqKeyFor()},
    ])
};

const connectList = [
    {sourceId:'b1',targetId:'b2'}
]

function GridDrag(props) {
    const initItems = useMemo(()=>getInitItems(),[])
    const [items,setItems] = useState(initItems);

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
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
        const {x:i_x,y:i_y} = item;
        item.x = t_x;
        item.y = t_y;
        const grid = createGrid({cols:10,rows:10,items});
        try{
            connectList.forEach((o)=>getElementPath(o,grid));
            setItems(_.clone(items));
        }catch ( e ){
            console.error(e);
            item.x = i_x;
            item.y = i_y;
            message.show({info:'此次拖动会导致路径无法连接!'})
        }
    }
}

export default GridDrag;
