import React, { useState, useRef} from 'react';
import './ViewResize.scss';

function ViewResize(props) {
    const [canMove,setCanMove] = useState(false);
    const [htmlWidth,setHtmlWidth] = useState(450);
    const prevXRef = useRef(null);

    return (<div className='ViewResize'
                 onMouseMove={handleMove}
                 onMouseLeave={()=>setCanMove(false)}
                 onMouseUp={()=>setCanMove(false)}>
        <div className="item html" style={{width:htmlWidth,height:540}}>HTML</div>
        <div className="line" onMouseDown={()=>setCanMove(true)}/>
        <div className="item view" style={{width:900 - htmlWidth,height:540}}>View</div>
    </div>);

    function handleMove(e){
        if(!canMove) return;
        e.preventDefault();
        e.stopPropagation();
        const prevX = prevXRef.current;
        prevXRef.current = e.clientX;
        if(prevX===null) return null;
        const offset = e.clientX - prevX;
        setHtmlWidth(x=>x+offset);
    }
}

export default ViewResize;

//出于性能的考虑，SyntheticEvent事件可能会被重用，在事件回调函数调用后，所有属性都会失效
//如果需要异步使用属性，有以下方案：
//1. 使用变量保留需要异步使用的属性
//2. 使用e.persist()
