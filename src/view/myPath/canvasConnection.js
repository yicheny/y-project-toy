import React, { useEffect, useMemo, useState } from 'react';
import './canvasConnection.scss';
import Connection from "./utils_retain/Connection";
import { message, Select } from "y-ui0";
import { createGrid, Grid } from "./utils/Grid";
import _ from "lodash";

const anchorOps = ['Top','Right','Bottom','Left','Center'].map(x=>({text:x,value:x}));

const getInitItems = function (){
    return _.cloneDeep( [
        {x:1,y:1,id:'x1'},
        {x:2,y:3,id:'x2'},
    ])
};

function CanvasConnection(props) {
    const initItems = useMemo(()=>getInitItems(),[])
    const [items,setItems] = useState(initItems);
    const [sourceAnchor,setSourceAnchor] = useState('Right');
    const [targetAnchor,setTargetAnchor] = useState('Top');

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items})
    },[items]);

    useEffect(()=>{
        const connect = Connection.create({
            options:{sourceId:'x1', targetId:'x2', sourceAnchor,targetAnchor},
            type:'flow'
        });
        return connect.clear;
    },[sourceAnchor,targetAnchor,items])

    return (<div className='CanvasConnection'>
        <div className="inputs">
            起始点方向：<Select options={anchorOps} defaultValue={sourceAnchor} onChange={setSourceAnchor}/>
            目标点方向：<Select options={anchorOps} defaultValue={targetAnchor} onChange={setTargetAnchor}/>
        </div>
        <div className="gridWrap">
            <Grid grid={grid} items={items} onChangeLocation={onChangeLocation}/>
        </div>
    </div>);

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

export default CanvasConnection;

