import React, { useEffect, useMemo, useState } from 'react';
import './canvasConnection.scss';
import Connection from "./utils_retain/Connection";
import { message, Select } from "y-ui0";
import { createGrid, Grid } from "./utils/Grid";
import _ from "lodash";

const anchorOps = ['Top','Right','Bottom','Left','Center'].map(x=>({text:x,value:x}));

const lineOps = [
    {text:'直线（默认）',value:'line'},
    {text:'折线',value:'flow'},
]

const colorOps = [
    {text:'灰色',value:'gray'},
    {text:'红色',value:'red'},
    {text:'蓝色',value:'blue'},
    {text:'绿色',value:'green'},
]

const sizeOps = [
    {text:'1px',value:1},
    {text:'2px',value:2},
    {text:'3px',value:3},
]

const getInitItems = function (){
    return _.cloneDeep( [
        {x:0,y:4,id:'x0',children:'x0'},
        {x:1,y:4,id:'x1',children:'x1'},
        {x:2,y:6,id:'x2',children:'x2'},
        {x:2,y:2,id:'x3',children:'x3'},
        {x:3,y:1,id:'x4',children:'x4'},
        {x:3,y:4,id:'x5',children:'x5'},
        {x:4,y:2,id:'x6',children:'x6'},
        {x:5,y:2,id:'x7',children:'x7'},
        {x:6,y:2,id:'x8',children:'x8'},
        {x:7,y:3,id:'x9',children:'x9'},
        {x:8,y:4,id:'x10',children:'x10'},
    ])
};

function CanvasConnection(props) {
    const initItems = useMemo(()=>getInitItems(),[])
    const [items,setItems] = useState(initItems);
    const [sourceAnchor,setSourceAnchor] = useState('Right');
    const [targetAnchor,setTargetAnchor] = useState('Left');
    const [type,setType] = useState('flow');
    const [color,setColor] = useState('gray');
    const [size,setSize] = useState(2);

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
                {sourceId:'x9', targetId:'x10', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x2', targetId:'x10', sourceAnchor: 'Right',targetAnchor: 'Left'},
                {sourceId:'x5', targetId:'x9', sourceAnchor: 'Bottom',targetAnchor: 'Left',lineColor: 'blue'},
                {sourceId:'x4', targetId:'x9', sourceAnchor: 'Top',targetAnchor: 'Left',lineColor:'red'},
            ],
            type,
            targetTurnLen:60,
            lineColor:color,
            lineWidth:size
        });
        return connect.clear;
    },[sourceAnchor,targetAnchor,items,type,color,size]);

    return (<div className='CanvasConnection'>
        <div className="inputs">
            起始点方向：<Select disabled options={anchorOps} defaultValue={sourceAnchor} onChange={setSourceAnchor}/>
            目标点方向：<Select disabled options={anchorOps} defaultValue={targetAnchor} onChange={setTargetAnchor}/>
            线的类型：<Select options={lineOps} defaultValue={type} onChange={setType}/>
            颜色：<Select options={colorOps} defaultValue={color} onChange={setColor}/>
            线宽：<Select options={sizeOps} defaultValue={size} onChange={setSize}/>
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

