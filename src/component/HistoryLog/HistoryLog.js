import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { Icon } from "../index";
import './HistoryLog.scss';

export default function HistoryLog({date,title,children,last}){
    const [open,toggle] = useToggle();

    // console.log(open);
    return <div className={clsx('history-log',{open,last})}>
        <div className="history-log-date">{ date }</div>
        <div className="history-log-sep">
            <div className="mark"> </div>
            <div className="tail"> </div>
        </div>
        <div className="history-log-title">
            { title }
            <Icon name={open ? 'arrow-up' : 'arrow-down'}
                  onClick={toggle}
                  style={{fontSize:12,color:'#7A8199',margin:'1px 6px'}}/>
        </div>
        <div className="history-log-main">
            { open ? <div className="content">{children}</div> : null }
        </div>
    </div>
}

function useToggle(defaultValue= true){
    const [open,setOpen] = useState(defaultValue);

    const toggle = useCallback(()=>{
        setOpen(x=>!x);
    },[])

    return [open,toggle];
}
