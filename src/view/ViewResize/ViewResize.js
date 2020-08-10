import React from 'react';
import './ViewResize.scss';

function ViewResize(props) {
    return (<div className='ViewResize'>
        <div className="item html" style={{width:450,height:540}}>HTML</div>
        <Line/>
        <div className="item view" style={{width:450,height:540}}>View</div>
    </div>);
}

export default ViewResize;

function Line(){
    return <div className="line"
                onMouseDown={()=>console.log('line-down')}
                onMouseMove={()=>console.log('line-move')}
                onMouseUp={()=>console.log('line-up')}
                />
}
