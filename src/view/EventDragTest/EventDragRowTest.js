import React, {useRef, useState} from 'react';
import _ from 'lodash';
import './EventDragRowTest.scss';

const mockData = Array.from(Array(10),(x,i)=>({
    dragText:`这里是第${i+1}行拖拽区域！`,
    fillText:`这里是第${i+1}行填充区域`
}));

export default function EventDragRowTest(props) {
    const [data,setData] = useState(mockData);
    const dragObjRef = useRef();

    return (<div className='EventDragRowTest'>
        {data.map((x,i)=>{
            return <div className="row" key={i}>
                <DragItem value={x} dragObjRef={dragObjRef} changeOrder={changeOrder}>{x.dragText}</DragItem>
                <div style={{width:300}}>{x.fillText}</div>
            </div>
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

function DragItem(props){
    const {children,value,changeOrder,dragObjRef} = props;

    return <div className="dragItem"
                draggable
                onDragStart={e=>handleDragStart(e,value)}
                onDragEnter={e=>handleDragEnter(e,value)}
                onDragLeave={handleDragLeave}
                onDrop={e=>handleDrop(e,value)}
                onDragOver={e=>handleDragOver(e,value)}
                onDragEnd={handleDragEnd}>
        {children}
    </div>

    function handleDragStart (e, o) {
        dragObjRef.current = o;
        const rowEle = e.nativeEvent.path.slice(1,2)[0];
        e.dataTransfer.setDragImage(rowEle,0,0);
    }
    function handleDragEnd (){
        dragObjRef.current = null;
    }
    function handleDragEnter (e, o){
        if (dragObjRef.current === o)
            return;
        const ele = e.currentTarget.parentElement;
        if (ele)
            ele.classList.add('dragover');
    }
    function handleDragLeave (e) {
        const ele = e.currentTarget.parentElement;
        if (ele){
            ele.classList.remove('dragover');
        }
    }
    function handleDrop (e, o) {
        const ele = e.currentTarget.parentElement;
        if (ele){
            ele.classList.remove('dragover');
        }

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
