import React, { useEffect, useMemo, useState } from 'react';
import './canvasConnection.scss';
import Connection from "./utils_retain/Connection";
import { message, Select } from "y-ui0";
import { createGrid, Grid } from "./utils/Grid";
import _ from "lodash";

const anchorOps = ['Top','Right','Bottom','Left','Center'].map(x=>({text:x,value:x}));

const getInitItems = function (){
    return _.cloneDeep( [
        {x:0,y:2,id:'x0',children:'x0'},
        {x:1,y:2,id:'x1',children:'x1'},
        {x:2,y:3,id:'x2',children:'x2'},
        {x:2,y:1,id:'x3',children:'x3'},
        {x:3,y:0,id:'x4',children:'x4'},
        {x:3,y:2,id:'x5',children:'x5'},
        {x:4,y:1,id:'x6',children:'x6'},
        {x:5,y:1,id:'x7',children:'x7'},
        {x:6,y:1,id:'x8',children:'x8'},
        {x:7,y:2,id:'x9',children:'x9'},
    ])
};

function CanvasConnection(props) {
    const initItems = useMemo(()=>getInitItems(),[])
    const [items,setItems] = useState(initItems);
    const [sourceAnchor,setSourceAnchor] = useState('Right');
    const [targetAnchor,setTargetAnchor] = useState('Left');

    const grid = useMemo(()=>{
        return createGrid({cols:10,rows:10,items});
    },[items]);

    useEffect(()=>{
        const connect = Connection.create({
            options:[
                {sourceId:'x0', targetId:'x1', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x1', targetId:'x2', sourceAnchor,targetAnchor},
                {sourceId:'x1', targetId:'x3', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x3', targetId:'x4', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x3', targetId:'x5', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x4', targetId:'x6', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x5', targetId:'x6', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x6', targetId:'x7', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x7', targetId:'x8', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x8', targetId:'x9', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x2', targetId:'x9', sourceAnchor: 'Right',targetAnchor: 'Left'},
            ],
            type:'flow',
            targetTurnLen:20,
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

