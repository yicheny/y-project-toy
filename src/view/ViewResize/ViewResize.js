import React, { useState, useRef, useCallback } from 'react';
import './ViewResize.scss';

function ViewResize(props) {
    return (<div className='ViewResize'>
        <div className="item html" style={{width:450,height:540}}>HTML</div>
        <Line/>
        <div className="item view" style={{width:450,height:540}}>View</div>
    </div>);
}

export default ViewResize;

function Line(props){
    const [canMove,setCanMove] = useState(false);
    const timeIdRef = useRef(null);

    const handleMove = useCallback((e)=>{
        if(!canMove) return;
        e.preventDefault();
        e.stopPropagation();
        const timeId = timeIdRef.current;
        if(timeId) clearTimeout(timeId);
        e.persist();

        timeIdRef.current = setTimeout(()=>{
            //出于性能的考虑，SyntheticEvent事件可能会被重用，在事件回调函数调用后，所有属性都会失效
            //如果需要异步使用属性，有以下方案：
            //1. 使用变量保留需要异步使用的属性
            //2. 使用e.persist()
            console.log(e.target.getBoundingClientRect());
        },100)
    },[canMove])

    return <div className="line"
                onMouseDown={()=>setCanMove(true)}
                onMouseMove={handleMove}
                onMouseUp={()=>setCanMove(false)}
                />
}
