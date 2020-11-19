import React, {useEffect, useState} from 'react';
import './canvasConnection.scss';
import Connection from "./utils_retain/Connection";
import {Select} from "y-ui0";

const anchorOps = ['Top','Right','Bottom','Left','Center'].map(x=>({text:x,value:x}));

function CanvasConnection(props) {
    const [sourceAnchor,setSourceAnchor] = useState('Center');
    const [targetAnchor,setTargetAnchor] = useState('Center');

    useEffect(()=>{
        const nodesName = ['x1','x2'];
        const [source,target] = nodesName.reduce((acc,x)=>{
            const node = document.querySelector(`.CanvasConnection>.${x}`);
            if(!node) return acc;
            return acc.concat([node]);
        },[]);

        const connect = Connection.create({source, target, sourceAnchor,targetAnchor});
        return connect.clear;
    },[sourceAnchor,targetAnchor])

    return (<div className='CanvasConnection'>
        起始点方向：<Select options={anchorOps} defaultValue={sourceAnchor} onChange={setSourceAnchor}/>
        目标点方向：<Select options={anchorOps} defaultValue={targetAnchor} onChange={setTargetAnchor}/>
        <div className="x1">x1</div>
        <div className="x2">x2</div>
    </div>);
}

export default CanvasConnection;

