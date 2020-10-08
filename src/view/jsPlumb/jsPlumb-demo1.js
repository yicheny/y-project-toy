import React, {useEffect} from 'react';
import {jsPlumb} from 'jsplumb'
import './jsPlumb-demo1.scss';

function JsPlumbDemo1(props) {

    useEffect(()=>{
        let plumbIns = jsPlumb.getInstance()
        let defaultConfig = {
            // 对应上述基本概念
            anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
            // connector: ['StateMachine'],
            connector:['Flowchart'],
            endpoint: 'Blank',
            // 添加样式
            paintStyle: { stroke: '#909399', strokeWidth: 2 }, // connector
            // endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 } // endpoint
            // 添加 overlay，如箭头
            overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ] // overlay
        }

        let relations = [
            ['item-4', 'item-1'],
            ['item-1', 'item-5'],
            ['item-5', 'item-2'],
            ['item-2', 'item-6'],
            ['item-6', 'item-3'],
            ['item-3', 'item-7'],
            ['item-7', 'item-9'],
            ['item-9', 'item-6'],
            ['item-6', 'item-8'],
            ['item-8', 'item-5'],
            ['item-3', 'item-9'],
            ['item-2', 'item-8'],
            ['item-1', 'item-4'],
            ['item-5', 'item-4']
        ]

        plumbIns.ready(function () {
            let anEndpoint = plumbIns.addEndpoint('item-4', {
                anchors: [ [0.7, 1, 0, 1] ],
                endpoint: 'Blank'
            })

            relations.push(['item-8', anEndpoint])

            for (let item of relations) {
                plumbIns.connect({
                    source: item[0],
                    target: item[1]
                }, defaultConfig)
            }
        })

        return plumbIns.deleteEveryConnection;
    },[])

    return (
        <div className='JsPlumbDemo1'>
            <div className="wrapper">
                <div className="line-wrap" style={{marinLeft:70}}>
                    <div id="item-1" className="state-item">State 1</div>
                    <div id="item-2" className="state-item">State 2</div>
                    <div id="item-3" className="state-item">State 3</div>
                </div>
                <div className="line-wrap">
                    <div id="item-4" className="state-item">State 4</div>
                    <div id="item-5" className="state-item">State 5</div>
                    <div id="item-6" className="state-item">State 6</div>
                    <div id="item-7" className="state-item">State 7</div>
                </div>
                <div className="line-wrap" style={{marginLeft:215}}>
                    <div id="item-8" className="state-item">State 8</div>
                    <div id="item-9" className="state-item">State 9</div>
                </div>
            </div>
        </div>
    );
}

export default JsPlumbDemo1;
