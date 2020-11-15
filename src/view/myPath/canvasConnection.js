import React, {useEffect} from 'react';
import './canvasConnection.scss';
import Connection from "./utils/Connection";

function CanvasConnection(props) {
    useEffect(()=>{
        const nodesName = ['x1','x2'];
        const [source,target] = nodesName.reduce((acc,x)=>{
            const node = document.querySelector(`.CanvasConnection>.${x}`);
            if(!node) return acc;
            return acc.concat([node]);
        },[]);

        const connect = Connection.create(source,target);
        return connect.clear;
    },[])

    return (<div className='CanvasConnection'>
        <div className="x1">x1</div>
        <div className="x2">x2</div>
    </div>);
}

export default CanvasConnection;

