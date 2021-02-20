import React, { useEffect, useState } from "react";
import { Button } from "y-ui0";

export default function ListContent(){
    const [count,setCount] = useState(0);

    useEffect(()=>{
        // console.log('ListContent', count);
    },[count])

    return <div>
        <p>list-content数据：{count}</p>
        <Button onClick={()=>setCount(count+1)}>增加ListContent数值</Button>
    </div>
}
