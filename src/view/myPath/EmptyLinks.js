import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { createGrid, Grid } from "./Component/Grid";
import ConnectionPath from "./utils/ConnectionPath";
import './EmptyLinks.scss';
import { message } from "y-ui0";

function EmptyLinks() {
    const [items,setItems] = useState(useInitNodes());
    const [hlCrood,setHlCrood] = useState();
    const prevItemsRef = useRef();

    const grid = useGrid(items);
    useCreateConnect({grid,hlCrood,setItems,prevItemsRef})

    return (
        <div className='EmptyLinks'>
            <Grid grid={grid} items={useRenderItems(items,setHlCrood)}
                  onChangeLocation={useChangeLocation(items,setItems,prevItemsRef)}/>
        </div>
    );
}

export default EmptyLinks;

//hook
function useInitNodes(){
    return useMemo(()=>{
        return getInitItems();

        function getInitItems(){
            return _.cloneDeep( [
                {x:3,y:3,id:'b1',className:'source'},
                {x:3,y:1,id:'b3',className:'source'},
                {x:5,y:1,id:'b5',className:'source'},
                {x:7,y:1,id:'b7',className:'source'},
                {x:9,y:5,id:'b9',className:'source'},
                {x:1,y:4,id:'b11',className:'source'},
                {x:3,y:4,id:'b13',className:'source'},
                {x:5,y:4,id:'b15',className:'source'},
                {x:7,y:4,id:'b17',className:'source'},
                {x:11,y:4,id:'b19',className:'source'},
                {x:1,y:9,id:'b21',className:'source'},
                {x:1,y:7,id:'b23',className:'source'},
                {x:5,y:7,id:'b25',className:'source'},
                {x:6,y:8,id:'b27',className:'source'},
                {x:9,y:7,id:'b29',className:'source'},
                {x:0,y:3,id:'b2',className:'target'},
                {x:2,y:1,id:'b4',className:'target'},
                {x:4,y:1,id:'b6',className:'target'},
                {x:6,y:1,id:'b8',className:'target'},
                {x:7,y:6,id:'b10',className:'target'},
                {x:0,y:4,id:'b12',className:'target'},
                {x:2,y:4,id:'b14',className:'target'},
                {x:5,y:6,id:'b16',className:'target'},
                {x:6,y:4,id:'b18',className:'target'},
                {x:8,y:4,id:'b20',className:'target'},
                {x:0,y:8,id:'b22',className:'target'},
                {x:2,y:8,id:'b24',className:'target'},
                {x:5,y:9,id:'b26',className:'target'},
                {x:4,y:8,id:'b28',className:'target'},
                {x:8,y:7,id:'b30',className:'target'},
            ]).map(x=>{
                x.x = x.x*2+1;
                x.y = x.y*2+1;
                return x;
            })
        }
    },[])
}

function useRenderItems(items,setHlCrood){
    return useMemo(()=>{
        return _.map(items,x=>{
            return _.defaults(x,{
                onMouseEnter:setHlCrood,
                onMouseLeave:()=>setHlCrood(null)
            });
        })
    },[items,setHlCrood]);
}

function useCreateConnect({grid,hlCrood,setItems,prevItemsRef}){
    useEffect(()=>{
        const connectList = _.times(15,(x)=>({sourceId:`b${2*x+1}`,targetId:`b${2*x+2}`})).concat([
            {sourceId: 'b11',targetId:'b10'},
            {sourceId: 'b11',targetId:'b14'},
            {sourceId: 'b11',targetId:'b16'},
            {sourceId: 'b11',targetId:'b18'},
        ]);
        const connectPath = ConnectionPath.create({grid,connectList,onError,hlCrood})
        return connectPath.clear;

        function onError(error){
            console.error(error);
            if(_.isNil(prevItemsRef.current)) return console.error('没有存储上一次的布局信息！');
            setItems(prevItemsRef.current);
            message.show({info:'此次拖动回导致路径无法连接，禁止操作！'})
        }
    },[grid,hlCrood,setItems,prevItemsRef]);
}

function useGrid(items){
    return useMemo(()=>{
        return createGrid({cols:24,rows:24,items})
    },[items]);
}

function useChangeLocation(items,setItems,prevItemsRef){
    return useCallback( (source,target) => {
        const {x:t_x,y:t_y} = target;
        if([t_x,t_y].some(isEven)) return ;
        const targetItem = _.find(items,o=>o.x===t_x&&o.y===t_y);
        if(targetItem) return message.show({info:'指定位置已有位置存在，不可移动'});
        const {id} = source;
        const item = _.find(items,x=>x.id===id);
        if(!item) return console.error("拖动出现异常!");
        prevItemsRef.current = _.cloneDeep(items);
        item.x = t_x;
        item.y = t_y;
        setItems(_.clone(items));
    },[items,setItems,prevItemsRef])
}

function isEven(number){
    return !(number%2)
}
