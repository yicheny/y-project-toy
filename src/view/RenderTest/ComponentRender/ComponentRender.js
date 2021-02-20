import React, { useState } from 'react';
import { Button } from "y-ui0";
import List from "../common/List";

function ComponentRender(props) {
    const [count,setCount] = useState(0);

    return (<div>
        <Button onClick={()=>setCount(count+1)}>增加ComponentRender数据</Button>
        <List count={count}/>
    </div>);
}

export default ComponentRender;



