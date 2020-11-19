import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./utils/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './GridDrag.scss';
import { uniqKeyFor } from "../../utils/publickFun";
import { message } from "y-ui0";

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
    const prevItemsRef = useRef();

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
        const connectPath = ConnectionPath.create({grid,connectList,onError})
        return connectPath.clear;

        function onError(error){
            if(_.isNil(prevItemsRef.current)) return console.error('没有存储上一次的布局信息！');
            setItems(prevItemsRef.current);
            message.show({info:'此次拖动回导致路径无法连接，禁止操作！'})
        }
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
        prevItemsRef.current = _.cloneDeep(items);
        item.x = t_x;
        item.y = t_y;
        setItems(_.clone(items));
    }
}

export default GridDrag;
