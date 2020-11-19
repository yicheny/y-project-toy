import React, { useRef } from "react";
import _ from "lodash";
import './Grid.scss';
import clsx from "clsx";

export function Grid({grid,items,onChangeLocation}){
    const dragObjRef = useRef();

    return <div className='y-gird'>
        {
            _.map(grid,(row,y)=>{
                return <div className='row' key={y}>
                    {
                        _.map(row,(col,x)=>{
                            const item = _.find(items,item=>{
                                return item.x === x && item.y === y;
                            });
                            return <DragItem className={`col x-${x} y-${y}`}
                                             dragObjRef={dragObjRef} value={{x,y,id:_.get(item,'id')}}
                                             changeOrder={_.defaultTo(onChangeLocation,()=>{})}
                                             y={y} x={x} key={x}>
                                    {item ? <div className={clsx('item',item.className) }
                                                 onMouseDown={item.onMouseDown}
                                                 onMouseLeave={item.onMouseLeave}
                                                 id={item.id}/> : null}
                            </DragItem>
                        })
                    }
                </div>
            })
        }
    </div>
}

export function createGrid({cols=9,rows=9,items}){
    const res = _.times(rows,()=>_.times(cols,()=>0));
    _.forEach(items,item=>{
        const {x,y} = item;
        if(x>=cols || y>= rows) return null;
        res[y][x] = -1;
    })
    return res;
}

//
function DragItem(props){
    const {children,value,changeOrder,dragObjRef,className,x,y} = props;

    return <div className={clsx("dragItem",className)}
                data-x={x}
                data-y={y}
                draggable={!!children}
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
