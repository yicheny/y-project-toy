import React, { useEffect, useRef } from 'react';
import Connection from "../utils/Connection";
import clsx from "clsx";
import './ConnectionContainer.scss';
import _ from "lodash";

function ConnectionContainer({ params,children,className,style}) {
    const containerRef = useRef();
    const unmountRef = useRef(()=>{});

    useEffect(()=>{
        return resizeObserverInit({
            callback:()=>Connection.create(params),
            targetNode:containerRef.current,
            unmountRef,
        })
    },[params])

    return <div className={clsx("ConnectionContainer",className)}
                ref={containerRef}
                style={style}>
        {children}
    </div>
}

export default ConnectionContainer;

function resizeObserverInit({targetNode,callback,unmountRef}){
    const resizeObserver = new window.ResizeObserver(_.debounce(render,0));
    resizeObserver.observe(targetNode);
    return ()=>{
        resizeObserver.unobserve(targetNode);
        unmountRef.current();
    };

    function render(){
        unmountRef.current();
        unmountRef.current = callback().clear;
    }
}
