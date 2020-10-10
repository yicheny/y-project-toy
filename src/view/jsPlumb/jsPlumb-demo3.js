import React, {useEffect} from 'react';
import _ from 'lodash';
import {jsPlumb} from 'jsplumb'
import './jsPlumb-demo3.scss';

function JsPlumbDemo3(props) {

    useEffect(()=>{
        let plumbIns = jsPlumb.getInstance()

        plumbIns.connect({
            source: 'item-1',
            target: 'item-3',
            anchor: ['Left', 'Right', 'Top', 'Bottom', [0.3, 0, 0, -1], [0.7, 0, 0, -1], [0.3, 1, 0, 1], [0.7, 1, 0, 1]],
            connector:['Flowchart',{alwaysRespectStubs:true,midpointer:0.2}],
            endpoint: 'Blank',
            paintStyle: { stroke: '#909399', strokeWidth: 2 },
            overlays: [ ['Arrow', { width: 8, length: 8, location: 1 }] ] ,
        })

        return plumbIns.deleteEveryConnection;
    },[])

    return (
        <div className='JsPlumbDemo3'>
            <div className="wrapper">
                {
                    _.times(3,i=>i+1).map(x=>{
                        return <div key={x} id={`item-${x}`} className="state-item">State {x}</div>
                    })
                }
            </div>
        </div>
    );
}

export default JsPlumbDemo3;
