import React, {useState} from 'react';
import {Button} from "y-ui0";

function ModeRender(props) {
    const [mode,setMode] = useState('A');

    return (<div>
        <Button onClick={()=>setMode(mode==='A'?'B':'A')}>切换容器</Button>
        {getBox(mode)}
    </div>);
}

export default ModeRender;

function getBox(mode){
    const boxMap = {
        A:<BoxA/>,
        B:<BoxB/>
    }
    // console.log('getBox');
    return boxMap[mode];
}

function BoxA(){
    console.log('BoxA')
    return <div>BoxA</div>
}

function BoxB(){
    console.log('BoxB')
    return <div>BoxB</div>
}

