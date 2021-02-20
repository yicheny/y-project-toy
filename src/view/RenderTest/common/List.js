import ListContent from "./ListContent";
import React, { useRef } from "react";

export default function List({count}){
    // console.log('List');

    return <div>
        <p>高层数据:{count}</p>
        {count%2 ? <ListContent/> : undefined}
        <Input/>
    </div>
}

function Input(){
    const ref = useRef();

    // console.log('input');
    return <input type="text" ref={ref} autoFocus={true}/>
}
