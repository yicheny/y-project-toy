import React, { useRef, useState } from 'react';
import clsx from "clsx";
import './BTResize.scss'

const BOX_HEIGHT = 540;
const MIN_HEIGHT = 120;
const HTML_MAX_HEIGHT = BOX_HEIGHT - MIN_HEIGHT;

function BTResize(props) {
    const [canMove,setCanMove] = useState(false);
    const [htmlHeight,setHtmlHeight] = useState(270);
    const prevYRef = useRef(null);

    return (<div className={clsx('BTResize',{resize:canMove})}
                 onMouseMove={handleMove}
                 onMouseLeave={handleClear}
                 onMouseUp={handleClear}>
        <div className="item html" style={{height:htmlHeight}}>HTML</div>
        <div className={clsx("line",{resize:canMove})}
             onMouseDown={()=>setCanMove(true)}/>
        <div className="item view" style={{height:BOX_HEIGHT - htmlHeight}}>View</div>
    </div>);

    function handleClear(){
        setCanMove(false);
        prevYRef.current = null;
    }

    function handleMove(e){
        if(!canMove) return;
        e.preventDefault();
        e.stopPropagation();
        const prevY = prevYRef.current;
        prevYRef.current = e.clientY;
        if(prevY===null) return null;
        const offset = e.clientY - prevY; //offset 为正则向下，为负则向上

        const overLimit = (htmlHeight + MIN_HEIGHT) > BOX_HEIGHT;
        if(overLimit && offset>0) return null;

        setHtmlHeight(x=>{
            const next = x + offset;
            return (next > HTML_MAX_HEIGHT) ? HTML_MAX_HEIGHT : next;
        });
    }
}

export default BTResize;
