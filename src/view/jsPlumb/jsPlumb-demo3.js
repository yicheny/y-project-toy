import React, {useEffect} from 'react';
import {jsPlumb} from 'jsplumb'
import './jsPlumb-demo3.scss';

const content = [
    <div key={0} id={`item-${1}`} className="state-item">State 1</div>,
    // <div key={1} id={`item-${2}`} className="state-item">State 2</div>,
    <div key={2} id={`item-${3}`} className="state-item" style={{marginTop:300}}>State 3</div>,
]

function JsPlumbDemo3(props) {

    useEffect(()=>{
        let plumbIns = jsPlumb.getInstance()

        plumbIns.connect({
            source: 'item-1',
            target: 'item-3',

            //position
            //只有一个的时候：箭头指向元素的位置
            //有两个的时候：第一个是流出的位置，第二个是流入的位置

            //x 箭头的左右偏移 >0向右
            //y 箭头的上下偏移 >0向下 <0向上
            //dx -1向右指向 +1向左指向
            //dy -1向下指向 +1向上指向
            //dx dy配合可用于流程线决定开始或结束一截的指向
            //ox 线段的左右位置偏移 >0向右
            //oy 线段的上下位置偏移 >0向下

            // anchor: ['Right', [1,0.5,1,0]],
            // anchor: ['Right','Right']
            // anchor:[[-1,0.5,0,0],[1,0.5,1,0]],
            // anchor:[[1,0.5,1,0]],
            // anchor:[1,0.5,1,0],

            anchor:[1,0.5,1,0,0,0],
            connector:['Flowchart',{stub:120}],
            endpoint: 'Blank',
            paintStyle: { stroke: '#909399', strokeWidth: 2 },
            overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ] ,
        })

        return plumbIns.deleteEveryConnection;
    },[])

    return (
        <div className='JsPlumbDemo3'>
            <div className="wrapper">
                { content }
            </div>
        </div>
    );
}

export default JsPlumbDemo3;
