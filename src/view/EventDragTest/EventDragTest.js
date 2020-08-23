import React, {useRef, useState} from 'react';
import _ from 'lodash';
import './EventDragTest.scss';

const mockData = Array.from(Array(10),(x,i)=>(`这里是第${i+1}行！`));

function EventDragTest(props) {
    const [data,setData] = useState(mockData);
    const dragObjRef = useRef();

    return (<div>
        {data.map((x,i)=>{
            return <DragItem key={i} value={x} dragObjRef={dragObjRef} changeOrder={changeOrder}>{x}</DragItem>
        })}
    </div>);

    function changeOrder(drag,o){
        // console.log(drag,o);
        const t = _.without(data, drag);
        const index = _.indexOf(t, o);
        t.splice(index, 0, drag);
        setData(t);
    }
}

export default EventDragTest;

function DragItem(props){
    const {children,value,changeOrder,dragObjRef} = props;

    return <div className="dragItem"
                draggable
                onDragStart={e=>handleDragStart(e,value)}
                onDragEnter={e=>handleDragEnter(e,value)}
                onDragLeave={handleDragLeave}
                onDrop={e=>handleDrop(e,value)}
                onDragOver={e=>handleDragOver(e,value)}
                onDragEnd={handleDragEnd}
                // onDragStart={()=>console.log("onDragStart")}
                // onDragEnd={()=>console.log("onDragEnd")}
                // onDragEnter={()=>console.log("onDragEnter")}
                // onDragExit={()=>console.log("onDragExit")}
                // onDragLeave={()=>console.log("onDragLeave")}
                // onDragOver={()=>console.log("onDragOver")}
                // onDrag={()=>console.log("onDrag")}
                >
        {children}
    </div>

    function handleDragStart (e, o) {
        dragObjRef.current = o;
    }
    function handleDragEnd (){
        dragObjRef.current = null;
    }
    function handleDragEnter (e, o){
        if (dragObjRef.current === o)
            return;
        const ele = e.currentTarget;
        if (ele)
            ele.classList.add('dragover');
    }
    function handleDragLeave (e) {
        const ele = e.currentTarget;
        if (ele)
            ele.classList.remove('dragover');
    }
    function handleDrop (e, o) {
        const ele = e.currentTarget;
        if (ele)
            ele.classList.remove('dragover');
        if (dragObjRef.current === o)
            return;
        const drag = dragObjRef.current;
        dragObjRef.current = null;
        changeOrder(drag, o);
    }
    function handleDragOver (e, o) {
        e.preventDefault();
        if (o !== dragObjRef.current)
            e.dataTransfer.dropEffect = 'move';
        else
            e.dataTransfer.dropEffect = 'none';
    }
}
//详细事件说明见：https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
