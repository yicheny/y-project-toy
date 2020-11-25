import React, {useEffect, useState} from 'react';
import './canvasConnection.scss';
import Connection from "./utils_retain/Connection";
import {Select} from "y-ui0";

const anchorOps = ['Top','Right','Bottom','Left','Center'].map(x=>({text:x,value:x}));

function CanvasConnection(props) {
    const [sourceAnchor,setSourceAnchor] = useState('Right');
    const [targetAnchor,setTargetAnchor] = useState('Top');

    useEffect(()=>{
        const connect = Connection.create({
            options:{sourceId:'x1', targetId:'x2', sourceAnchor,targetAnchor},
            type:'flow'
        });
        return connect.clear;
    },[sourceAnchor,targetAnchor])

    return (<div className='CanvasConnection'>
        起始点方向：<Select options={anchorOps} defaultValue={sourceAnchor} onChange={setSourceAnchor}/>
        目标点方向：<Select options={anchorOps} defaultValue={targetAnchor} onChange={setTargetAnchor}/>
        <div id="x1">x1</div>
        <div id="x2">x2</div>
    </div>);
}

export default CanvasConnection;

