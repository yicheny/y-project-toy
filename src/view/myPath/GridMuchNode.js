import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./utils/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './GridMuchNode.scss';
import { message } from "y-ui0";

const getInitItems = function (){
    return _.cloneDeep( [
        {x:1,y:1,element:<div className='box source' id='b1'/>,id:'b1'},
        {x:3,y:1,element:<div className='box source' id='b3'/>,id:'b3'},
        {x:5,y:1,element:<div className='box source' id='b5'/>,id:'b5'},
        {x:7,y:1,element:<div className='box source' id='b7'/>,id:'b7'},
        {x:9,y:1,element:<div className='box source' id='b9'/>,id:'b9'},
        {x:1,y:4,element:<div className='box source' id='b11'/>,id:'b11'},
        {x:3,y:4,element:<div className='box source' id='b13'/>,id:'b13'},
        {x:5,y:4,element:<div className='box source' id='b15'/>,id:'b15'},
        {x:7,y:4,element:<div className='box source' id='b17'/>,id:'b17'},
        {x:9,y:4,element:<div className='box source' id='b19'/>,id:'b19'},
        {x:1,y:7,element:<div className='box source' id='b21'/>,id:'b21'},
        {x:3,y:7,element:<div className='box source' id='b23'/>,id:'b23'},
        {x:5,y:7,element:<div className='box source' id='b25'/>,id:'b25'},
        {x:7,y:7,element:<div className='box source' id='b27'/>,id:'b27'},
        {x:9,y:7,element:<div className='box source' id='b29'/>,id:'b29'},
        {x:0,y:1,element:<div className='box target' id='b2'/>,id:'b2'},
        {x:2,y:1,element:<div className='box target' id='b4'/>,id:'b4'},
        {x:4,y:1,element:<div className='box target' id='b6'/>,id:'b6'},
        {x:6,y:1,element:<div className='box target' id='b8'/>,id:'b8'},
        {x:8,y:1,element:<div className='box target' id='b10'/>,id:'b10'},
        {x:0,y:4,element:<div className='box target' id='b12'/>,id:'b10'},
        {x:2,y:4,element:<div className='box target' id='b14'/>,id:'b12'},
        {x:4,y:4,element:<div className='box target' id='b16'/>,id:'b14'},
        {x:6,y:4,element:<div className='box target' id='b18'/>,id:'b16'},
        {x:8,y:4,element:<div className='box target' id='b20'/>,id:'b18'},
        {x:0,y:7,element:<div className='box target' id='b22'/>,id:'b20'},
        {x:2,y:7,element:<div className='box target' id='b24'/>,id:'b22'},
        {x:4,y:7,element:<div className='box target' id='b26'/>,id:'b24'},
        {x:6,y:7,element:<div className='box target' id='b28'/>,id:'b26'},
        {x:8,y:7,element:<div className='box target' id='b30'/>,id:'b28'},
    ])
};

const connectList = _.times(15,(x)=>({sourceId:`b${2*x+1}`,targetId:`b${2*x+2}`})).concat([
    {sourceId: 'b11',targetId:'b10'},
    {sourceId: 'b11',targetId:'b14'},
    {sourceId: 'b11',targetId:'b16'},
    {sourceId: 'b11',targetId:'b18'},
])

function GridMuchNode(props) {
    const initItems = useMemo(()=>getInitItems(),[])
    const [items,setItems] = useState(initItems);
    const prevItemsRef = useRef();

    const grid = useMemo(()=>{
        return createGrid({cols:17,rows:17,items})
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
        <div className='GridMuchNode'>
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

export default GridMuchNode;
