import React, { useEffect, useState } from 'react';

/*const ChildrenItem = React.memo(function (props){
    const {index} = props;

    useEffect(()=>{
        console.log('mount',index);
    },[index]);

    mockCalculate();
    return <div>
        {index}
    </div>
})*/

const ChildrenItem = function (props){
    const {index} = props;

    useEffect(()=>{
        console.log('mount',index);
    },[index]);

    mockCalculate();
    return <div>
        {index}
    </div>
}

//模拟复杂运算
function mockCalculate(){
    Array.from(Array(1000000),(x,i)=>{
        return Math.random() * (i*i+100)/6*0.334;
    })
}

const indexs = [1,2,3,4];

function FiberS1(props) {
    const [key,setKey] = useState(0);
    const [count,setCount] = useState(indexs.length);
    console.log(key);
    return <Box key={key}>
        <button onClick={()=>setKey(x=>++x)}>重新加载Box</button>
        <button onClick={addItem}>新增数据</button>
        <div>当前共有{count}条数据</div>

        {/*<ChildrenItem index={1}/>
        <ChildrenItem index={2}/>
        <ChildrenItem index={3}/>
        <ChildrenItem index={4}/>
        {
            indexs.slice(4,Infinity).map((x,i)=>{
                return <ChildrenItem key={i+4} index={x}/>
            })
        }*/}

        {
            indexs.map((x,i)=>{
                return <ChildrenItem index={x} key={i}/>
            })
        }
    </Box>

    function addItem(){
        const next = indexs.length+1;
        indexs.push(next);
        setCount(next);
    }
}

export default FiberS1;

function Box(props){
    const [title,setTitle] = useState(0);
    return <div>
        <h3>Box标题：{title}</h3>
        <button onClick={()=>setTitle(x=>++x)}>修改Box标题</button>
        {props.children}
    </div>
}
