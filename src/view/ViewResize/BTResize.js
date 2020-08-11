import React, { useRef, useState } from 'react';
import clsx from "clsx";
import './BTResize.scss'

function BTResize(props) {
    const [canMove,setCanMove] = useState(false);
    const [htmlHeight,setHtmlHeight] = useState(270);
    const prevYRef = useRef(null);

    return (<div className={clsx('BTResize',{resize:canMove})}
                 onMouseMove={handleMove}
                 onMouseLeave={()=>setCanMove(false)}
                 onMouseUp={()=>setCanMove(false)}>
        <div className="item html" style={{height:htmlHeight}}>HTML</div>
        <div className={clsx("line",{resize:canMove})}
             onMouseDown={()=>setCanMove(true)}/>
        <div className="item view" style={{height:540 - htmlHeight}}>View</div>
    </div>);

    function handleMove(e){
        if(!canMove) return;
        e.preventDefault();
        e.stopPropagation();
        const prevY = prevYRef.current;
        prevYRef.current = e.clientY;
        if(prevY===null) return null;
        const offset = e.clientY - prevY;
        setHtmlHeight(x=>x+offset);
    }
}

export default BTResize;
