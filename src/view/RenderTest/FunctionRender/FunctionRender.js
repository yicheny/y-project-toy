import React, { useState } from 'react';
import { Button } from "y-ui0";
import List from "../common/List";

function FunctionRender(props) {
    const [count,setCount] = useState(0);

    return (<div>
        <Button onClick={()=>setCount(count+1)}>增加FunctionRender数据</Button>
        {getList(count)}
    </div>);

    function getList(count){
        // console.log('getList');
        return <List count={count}/>
    }
}

export default FunctionRender;
